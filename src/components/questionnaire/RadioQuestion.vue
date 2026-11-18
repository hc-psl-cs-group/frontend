<script setup lang="ts">
    import type {
        Question
    } from '@/ts/form';

    const props = defineProps<{
        'question': Question
    }>();
    const answer = defineModel<string>();
</script>

<template>
    <div>
        <h1>{{ props.question.question }}</h1>
        <p>Radio</p>
    </div>
</template>
