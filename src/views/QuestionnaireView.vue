<script setup lang="ts">
    import {
        type Ref,
        ref
    } from 'vue';
    import MultipleChoiceQuestion from '@/components/questionnaire/MultipleChoiceQuestion.vue';
    import type {
        Question
    } from '@/ts/form';

    const questions: Ref<Question[]> = ref( [] );
    const answers: Ref<string[]> = ref( [] );
</script>

<template>
    <div>
        <h1>Questions</h1>
        <div v-for="(question, index) in questions" :key="index">
            <h2>{{ question.question }}</h2>
            <MultipleChoiceQuestion v-if="question.type === 'multiple'" v-model="answers[index]" :question="question" />
        </div>
    </div>
</template>
