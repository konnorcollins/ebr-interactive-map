<script lang="ts">

    interface Props {
        x: number,
        y: number,
        mapImage: string,
    }

    let { x, y, mapImage }: Props = $props();


    let svgElem = $state<SVGElement>();
    let svgWidth = $derived(svgElem?.getBoundingClientRect().width);
    let svgHeight = $derived(svgElem?.getBoundingClientRect().height);

    let map = $state<SVGImageElement>();
    let mapScaleFactor = $derived(map?.transform.baseVal);


    let showLocationCardNumbers = $state(false);

</script>

<div id="mapDiv">
    <svg bind:this={svgElem} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" id="mapSVG">
        <!-- Define some global effects -->
        <defs>
            <filter id="dropShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" />
            </filter>
        </defs>

        <image bind:this={map} id="mapImage" width="6000" height="7800" {x} {y} href={mapImage} transform="scale(0.4)" />
    </svg>
</div>