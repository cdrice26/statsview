const toTitleCase = (str) =>
  str
    .toLowerCase() // Convert the entire string to lowercase
    .split(' ') // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the array back into a string

export default toTitleCase;
