<script setup lang="ts">
    import {
        type Ref,
        ref
    } from 'vue';
    import type {
        Manifest
    } from '@/ts/form';
    import router from '@/router';

    const manifest: Ref<Manifest> = ref( {
        'name': 'Unknown Survey',
        'questionSets': []
    } );

    const selectSurvey = ( idx: number ) => {
        router.push( '/questions?q=' + manifest.value.questionSets[idx]!.url );
    };

    const load = async () => {
        manifest.value = await ( await fetch( '/manifest.json' ) ).json();
    };

    load();
</script>

<template>
    <div>
        <h1>{{ manifest.name }}</h1>
        <div v-for="(survey, index) in manifest.questionSets" :key="index">
            <h2>{{ survey.name }}</h2>
            <p v-if="survey.description"></p>
            <button @click="() => selectSurvey( index )">
                Open
            </button>
        </div>
    </div>
</template>
