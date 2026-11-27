<script setup lang="ts">
    import {
        type PropType, ref
    } from 'vue';
    import RadioQuestion from '@/components/questionnaire/RadioQuestion.vue';
    import type {
        Question
    } from '@/ts/form';

    const props = defineProps( {
        'questions': {
            'type': Array as PropType<Question[]>,
            'required': true
        }
    } );
    const emit = defineEmits<{
        'finish': [answers: Record<string, string>]
    }>();
    const answers = ref<Record<string, string>>( {} );

    const submit = () => {
        emit( 'finish', {
            ...answers.value
        } );
    };
</script>

<template>
    <div class="questionnaire-wrapper">
        <h2>Post Survey Questionnaire</h2>
        <p>Please answer the following questions about the survey</p>

        <div
            v-for="question in props.questions"
            :key="question.id"
        >
            <h3>{{ question.question }}</h3>

            <RadioQuestion
                v-if="question.type === 'radio'"
                v-model="answers[question.id]"
                :question="question"
            />

            <textarea
                v-else-if="question.type === 'textarea'"
                v-model="answers[question.id]"
                rows="5"
                placeholder="Your answer..."
            ></textarea>

            <input
                v-else-if="question.type === 'short-text'"
                v-model="answers[question.id]"
                type="text"
                placeholder="Your answer..."
            >
        </div>

        <button type="button" @click="submit">
            Submit feedback
        </button>
    </div>
</template>

<style lang="scss">
    @use '@/scss/pages/questionnaire.scss';
</style>

