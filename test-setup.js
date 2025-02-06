// test-setup.js
import { TextDecoder, TextEncoder } from 'util';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import module from 'module';

// Polyfill global objects
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

// Dynamic package path resolver
function resolvePackagePath(packageName) {
  try {
    // Try to resolve the package path using Node.js module system
    const require = module.createRequire(import.meta.url);

    // Attempt to find the package path
    const packagePath = require.resolve(`${packageName}/package.json`);

    // Get the directory of the package
    return path.dirname(packagePath);
  } catch (error) {
    console.error(`Failed to resolve package path for ${packageName}:`, error);
    throw new Error(`Cannot find package path for ${packageName}`);
  }
}

// Custom fetch implementation for WebAssembly in Node.js
globalThis.fetch = async (url) => {
  try {
    // Convert url to string if it's not already
    const urlString = typeof url === 'string' ? url : String(url);

    // Check if it's a WebAssembly file
    if (urlString.includes('.wasm')) {
      // Dynamically resolve the package path
      const packagePath = resolvePackagePath('statmaster');

      // Construct path to the .wasm file
      const wasmPath = path.resolve(packagePath, 'statmaster_bg.wasm');

      console.log('Resolved WASM path:', wasmPath);

      // Read file as buffer
      const buffer = await readFile(wasmPath);

      return {
        ok: true,
        arrayBuffer: async () =>
          buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength
          )
      };
    }

    // Fallback error for non-local resources
    throw new Error(`Cannot fetch resource: ${urlString}`);
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};

// Polyfill WebAssembly.instantiate to handle our custom fetch
const originalInstantiate = globalThis.WebAssembly.instantiate;
globalThis.WebAssembly.instantiate = async (bufferSource, importObject) => {
  try {
    // If bufferSource is a Response-like object, extract its buffer
    if (bufferSource && typeof bufferSource.arrayBuffer === 'function') {
      const buffer = await bufferSource.arrayBuffer();
      return originalInstantiate(buffer, importObject);
    }

    // Otherwise, use the original implementation
    return originalInstantiate(bufferSource, importObject);
  } catch (error) {
    console.error('WebAssembly instantiate failed:', error);
    throw error;
  }
};

console.log('Statmaster fetch polyfill initialized');
