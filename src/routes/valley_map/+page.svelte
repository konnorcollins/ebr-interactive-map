<script lang="ts">
    import ValleyMapImage from "$lib/assets/EBR001_Valley Map_eng.jpg"
    import InteractiveMap from "$lib/components/InteractiveMap.svelte";

</script>


<InteractiveMap 
    width={6000} 
    height={7800} 
    x={-1310} 
    y={-1445} 
    scaleFactor={0.4} 
    mapImage={ValleyMapImage} 
/>