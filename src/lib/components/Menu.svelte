<script lang="ts">
    import ValleyBanner from "$lib/assets/banner-lure.jpg";
    import ArcologyBanner from "$lib/assets/banner-legacy.jpg";

    let showMenu = $state(true);
</script>

{#if showMenu}
    <div id="menu">
        <h3>Map Select</h3>
        <div class="links">
            <a href="/valley_map">The Valley</a>
            <a href="/arcology_map">The Arcology</a>
        </div>


        <h3>Options</h3>
        <div class="options">
            <p>Under construction...</p>
        </div>
        <button onclick={() => {showMenu = false}}>Hide</button>
    </div>
{/if}

<style>
    #menu {
        position: absolute;
        left: 5px;
        top: 5px;
        z-index: 5;

        display: flex;
        flex-direction: column;
    }

    .links {
        display: flex;
        flex-direction: column;
    }


    
</style>
