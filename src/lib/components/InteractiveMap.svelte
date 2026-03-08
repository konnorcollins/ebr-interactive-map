<script lang="ts">

    import { locationData } from "$lib/locations";
    import { getShowLocationNumbers } from "$lib/options.svelte";


    interface Props {
        width: number,
        height: number,
        x: number,
        y: number,
        scaleFactor: number,
        mapImage: string,
        locationSet: 'valleyBase' | 'legacyArcology'
    }

    let { width, height, x, y, scaleFactor, mapImage, locationSet }: Props = $props();


    let svgElem = $state<SVGElement>();

    let isDragging = $state(false);
    let startX = $state(0);
    let startY = $state(0);

    function onmousedown(event: MouseEvent) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
    }

    function onmousemove(event: MouseEvent) {
        if (!isDragging) return;

        event.preventDefault()

        let cursorX = event.clientX;
        let cursorY = event.clientY;

        drag(cursorX, cursorY);
    }

    function onmouseup() {
        isDragging = false;
    }

    function onmouseleave() {
        isDragging = false;
    }

    function ontouchstart() {
        isDragging = true;
    }

    function ontouchmove(event: TouchEvent) {
        if (!isDragging) return;

        event.preventDefault()

        let cursorX = event.touches[0].clientX;
        let cursorY = event.touches[0].clientY;

        drag(cursorX, cursorY);
    }

    function ontouchend() {
        isDragging = false;
    }

    function ontouchcancel() {
        isDragging = false;
    }

    function drag(cursorX: number, cursorY: number) {
        if (!svgElem) return;

        // Define limits for dragging
        // TODO: parameterize the bounds

        const topBound = 1400;
        const leftBound = 1400;
        const rightBound = 4580;
        const bottomBound = 6090;
        const mapOriginXMin = (-1 * rightBound * scaleFactor) / scaleFactor;
        const mapOriginXMax = (svgElem.clientWidth - (leftBound * scaleFactor)) / scaleFactor;
        const mapOriginYMin = (-1 * bottomBound * scaleFactor) / scaleFactor;
        const mapOriginYMax = (svgElem.clientHeight - (topBound * scaleFactor)) / scaleFactor;

        let deltaX = Math.round((cursorX - startX) / scaleFactor);
        let deltaY = Math.round((cursorY - startY) / scaleFactor);

        // Check if movement would be out of bounds
        if ((x + deltaX > mapOriginXMax) || 
        (x + deltaX < mapOriginXMin) ||
        (y + deltaY > mapOriginYMax) || 
        (y + deltaY < mapOriginYMin)) {
                    return;
        }


        x += deltaX;
        y += deltaY;

        startX = cursorX;
        startY = cursorY;
    }

    function onwheel(event: WheelEvent) {
        if (event.deltaY > 0) zoomOut();
        else if (event.deltaY < 0) zoomIn();
    }

    function zoomOut() {
        if (!svgElem) return;

        // TODO: Change this from a hard-coded width to derived from something
        const minimumScaleFactor = Math.ceil((svgElem.clientWidth / 3310) * 10.0) / 10.0;

        if (scaleFactor > minimumScaleFactor) {
            let scaleDelta = 0.1;
            let deltaX = (0.5 * svgElem.clientWidth) * (scaleDelta / (scaleFactor - scaleDelta)) * (1.0 / scaleFactor);
            let deltaY = (0.5 * svgElem.clientHeight) * (scaleDelta/ (scaleFactor - scaleDelta)) * (1.0 / scaleFactor);
            x = x + deltaX;
            y = y + deltaY;
            scaleFactor -= scaleDelta;
        }
    }

    function zoomIn() {
        if (!svgElem) return;

        const maximumScaleFactor = 1.0;

        if (scaleFactor < maximumScaleFactor) {
            let scaleDelta = 0.1;
            let deltaX = (0.5 * svgElem.clientWidth) * (scaleDelta / (scaleFactor + scaleDelta)) * (1.0 / scaleFactor);
            let deltaY = (0.5 * svgElem.clientHeight) * (scaleDelta/ (scaleFactor + scaleDelta)) * (1.0 / scaleFactor);
            x = x - deltaX;
            y = y - deltaY;
            scaleFactor += scaleDelta;
        }
    }



</script>

<div id="mapDiv">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <svg 
        bind:this={svgElem} 
        xmlns="http://www.w3.org/2000/svg" 
        id="mapSVG"

        {onmousedown}
        {onmousemove}
        {onmouseup}
        {onmouseleave}

        {ontouchstart}
        {ontouchmove}
        {ontouchend}
        {ontouchcancel}

        {onwheel}

        >
        <!-- Define some global effects -->
        <defs>
            <filter id="dropShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" />
            </filter>
        </defs>

        <image 
            id="mapImage" 
            {width} 
            {height}
            {x}
            {y} 
            href={mapImage} 
            transform={`scale(${scaleFactor})`} 
        />

        {#each locationData.filter((l) => l.set == locationSet) as location (location.name)}

            {#if location.isPivotal}
                <circle
                    r={Math.round(65 * scaleFactor)}
                    cx={Math.round((location.x - (-x)) * scaleFactor)}
                    cy={Math.round((location.y - (-y)) * scaleFactor)}

                    class="locationButton circle"

                    data-x={location.x} 
                    data-y={location.y}
                />
            {:else}
                <rect
                    width={Math.round(111 * scaleFactor)}
                    height={Math.round(111 * scaleFactor)}
                    x={Math.round((location.x - (-x)) * scaleFactor)}
                    y={(location.y - (-y) - Math.round(111 * Math.SQRT2 / 2)) * scaleFactor}
                    rx={9}
                    ry={9}
                    transform={`rotate(${45} ${Math.round((location.x - (-x)) * scaleFactor)} ${(location.y - (-y) - Math.round(111 * Math.SQRT2 / 2)) * scaleFactor})`}
                    class="locationButton square"
                    class:glow={() => getShowLocationNumbers()}
                    data-x={location.x} 
                    data-y={location.y}
                    
                />
            {/if}

        {/each}
    </svg>
</div>

<style>
    svg {
        width: 100%;
        height: 100%;
    }

    svg > image {
        /* Removes the ghost image when dragging the map */
        user-select: none;
    }
</style>