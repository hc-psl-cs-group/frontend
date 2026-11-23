<script setup lang="ts">
    import {
        type Ref,
        ref
    } from 'vue';
    import MultipleChoiceQuestion from '@/components/questionnaire/MultipleChoiceQuestion.vue';
    import type {
        QuestionSet
    } from '@/ts/form';
    import RadioQuestion from '@/components/questionnaire/RadioQuestion.vue';

    const load = async () => {
        const file = location.search.substring( location.search.indexOf( 'q=' ) + 2 );

        try {
            questionSet.value = await ( await fetch( file.slice( 0, file.indexOf( '&' ) ) ) ).json() as QuestionSet;
        } catch ( error ) {
            console.error( error );
            alert( 'Failed to load questions' );
        }
    };

    const questionSet: Ref<QuestionSet> = ref( {
        'name': 'Question Set',
        'questions': [],
        'description': '',
        'followUpQuestions': []
    } );
    const answers: Ref<string[]> = ref( [] );

    load();
</script>

<template>
    <div class="questionnaire-wrapper">
        <h1>{{ questionSet.name }}</h1>
        <p v-if="questionSet.description">
            {{ questionSet.description }}
        </p>
        <div v-for="(question, index) in questionSet.questions" :key="index">
            <h2>{{ question.question }}</h2>
            <p v-if="question.explanation">
                {{ question.explanation }}
            </p>
            <MultipleChoiceQuestion v-if="question.type === 'multiple'" v-model="answers[index]" :question="question" />
            <RadioQuestion v-if="question.type === 'radio'" v-model="answers[index]" :question="question" />
            <textarea
                v-if="question.type === 'textarea'"
                v-model="answers[index]"
                placeholder="Your response..."
                rows="7"
            ></textarea>
            <input
                v-if="question.type === 'short-text'"
                v-model="answers[index]"
                placeholder="Your response..."
                type="text"
            >
        </div>
    </div>
</template>

<style lang="scss">
    @use '@/scss/pages/questionnaire.scss';
</style>
