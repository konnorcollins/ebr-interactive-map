<script lang="ts">

    interface Props {
        x: number,
        y: number,
        scaleFactor: number,
        mapImage: string,
    }

    let { x, y, scaleFactor, mapImage }: Props = $props();


    let svgElem = $state<SVGElement>();
    let map = $state<SVGImageElement>();



    let isDragging = $state(false);
    function onmousedown() {
        isDragging = true;
    }

    function onmousemove(event: MouseEvent) {

        if (!svgElem) return;

        // Define limits for dragging
        const topBound = 1400;
        const leftBound = 1400;
        const rightBound = 4580;
        const bottomBound = 6090;
        const mapOriginXMin = (-1 * rightBound * scaleFactor) / scaleFactor;
        const mapOriginXMax = (svgElem.clientWidth - (leftBound * scaleFactor)) / scaleFactor;
        const mapOriginYMin = (-1 * bottomBound * scaleFactor) / scaleFactor;
        const mapOriginYMax = (svgElem.clientHeight - (topBound * scaleFactor)) / scaleFactor;


        if (!isDragging) return;

        event.preventDefault()

        let cursorX = event.clientX;
        let cursorY = event.clientY;

        let deltaX = Math.round((cursorX - x) / scaleFactor);
        let deltaY = Math.round((cursorY - y) / scaleFactor);

        // Check if movement would be out of bounds
        if ((x + deltaX > mapOriginXMax) || 
        (x + deltaX < mapOriginXMin) ||
        (y + deltaY > mapOriginYMax) || 
        (y + deltaY < mapOriginYMin)) {
                    return;
        }


        x = x + deltaX;
        y = y + deltaY;
    }

    function onmouseup() {
        isDragging = false;
    }

    function onmouseleave() {
        isDragging = false;
    }

    function onwheel(event: WheelEvent) {
        if (event.deltaY > 0) zoomOut();
        else if (event.deltaY < 0) zoomIn();
    }

    function zoomOut() {
        if (!map || !svgElem) return;

        // TODO: Change this from a hard-coded width to derived from something
        const minimumScaleFactor = Math.ceil((svgElem.clientWidth / 3310) * 10.0) / 10.0;

        if (scaleFactor > minimumScaleFactor) {
            let scaleDelta = 0.1;
            let deltaX = (0.5 * svgElem.clientWidth) * (scaleDelta / (scaleFactor + scaleDelta)) * (1.0 / scaleFactor);
            let deltaY = (0.5 * svgElem.clientHeight) * (scaleDelta/ (scaleFactor + scaleDelta)) * (1.0 / scaleFactor);
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
    <svg 
        bind:this={svgElem} 
        xmlns="http://www.w3.org/2000/svg" 
        id="mapSVG"

        {onmousedown}
        {onmousemove}
        {onmouseup}
        {onmouseleave}

        {onwheel}

        >
        <!-- Define some global effects -->
        <defs>
            <filter id="dropShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" />
            </filter>
        </defs>

        <image bind:this={map} id="mapImage" width="6000" height="7800" {x} {y} href={mapImage} transform={`scale(${scaleFactor})`} />
    </svg>
</div>

<style>
    svg {
        width: 100%;
        height: 100%;
    }
</style>