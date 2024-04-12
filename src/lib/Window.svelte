<!--This is a simple window that can be wrapped around another component.
    It darkens and inactivates everything outside it.-->

<div id="prevent-interaction">
    <div id="window">
        <slot />
    </div>
</div>

<style>
    #prevent-interaction {
        width: 100vw;
        height: 100vh;
        background-color: rgba(30, 30, 30, 0.5);
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 999999;
    }
    #window {
        padding: 15px;
        border-radius: 15px;
        background-color: white;
        filter: drop-shadow(3px 3px 5px rgb(40, 40, 40));
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000000;
    }
</style>
