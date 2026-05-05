<script lang="ts">
    import {
        getShowLocationNumbers,
        toggleLocationNumbers,
    } from "$lib/options.svelte";

    let showMenu = $state(true);
</script>

<div id="menu">
    {#if showMenu}
        <h3>Map Select</h3>
        <div class="links">
            <a href="/valley_map"
                ><img src="/banner-lure.jpg" alt="The Valley" /></a
            >
            <a href="/arcology_map"
                ><img src="/banner-legacy.jpg" alt="The Arcology" /></a
            >
        </div>

        <h3>Options</h3>
        <div class="options">
            <button onclick={() => toggleLocationNumbers()}
                >{getShowLocationNumbers() ? "Hide" : "Show"} Location Numbers</button
            >
            <p>Under construction...</p>
        </div>
        <button
            onclick={() => {
                showMenu = false;
            }}>Hide</button
        >
    {:else}
        <!-- TODO: Create hamburger to re-open the menu -->
        <button
            onclick={() => {
                showMenu = true;
            }}>Show</button
        >
    {/if}
</div>

<style>
    #menu {
        position: absolute;
        left: 5px;
        top: 5px;
        z-index: 5;

        display: flex;
        flex-direction: column;

        border-radius: 2px;
        border-color: rgb(11, 40, 30);
        background-color: rgb(250, 250, 226);
    }

    .links {
        display: flex;
        flex-direction: column;
    }
</style>
