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
    import QuestionnaireFollowUp from '@/components/questionnaire/QuestionnaireFollowUp.vue';
    import {
        request
    } from '@janishutz/oidc-login-sdk-browser';

    const shuffle = <T>( items: T[] ): T[] => {
        const result = [ ...items ];

        for ( let i = result.length - 1; i > 0; i-- ) {
            const j = Math.floor( Math.random() * ( i + 1 ) );

            [
                result[i],
                result[j]
            ] = [
                result[j]!,
                result[i]!
            ];
        }

        return result;
    };

    const load = async () => {
        const file = location.search.substring(
            location.search.indexOf( 'q=' ) + 2
        );

        try {
            const endIdx = file.indexOf( '&' );

            questionSet.value = await (
                await fetch(
                    file.slice(
                        0,
                        endIdx >= 0 ? endIdx : undefined
                    )
                )
            ).json() as QuestionSet;

            // Randomize question order
            questionSet.value.questions = shuffle(
                questionSet.value.questions
            );

            // Randomize answer order but keep "Prefer not to answer" last
            questionSet.value.questions.forEach( question => {
                if ( !question.options ) return;

                const ordinaryOptions = question.options.filter(
                    option => option.trim().toLowerCase()
                        !== 'prefer not to answer'
                );
                const optOutOptions = question.options.filter(
                    option => option.trim().toLowerCase()
                        === 'prefer not to answer'
                );

                question.options = [
                    ...shuffle( ordinaryOptions ),
                    ...optOutOptions
                ];
            } );
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
    const answers: Ref<{
        [id: string]: string
    }> = ref( {} );

    const storeAnswers = () => {
        request.put( '/responses/record', JSON.stringify(
            {
                'answers': answers.value,
                'questionSetId': questionSet.value.name
            }
        ) );
    };

    load();
</script>

<template>
    <div class="questionnaire-wrapper">
        <h1>{{ questionSet.name }}</h1>

        <RouterLink to="/app">
            Back to selector
        </RouterLink>

        <p v-if="questionSet.description">
            {{ questionSet.description }}
        </p>

        <div
            v-for="(question, index) in questionSet.questions"
            :key="index"
        >
            <h2>{{ question.question }}</h2>

            <p v-if="question.explanation">
                {{ question.explanation }}
            </p>

            <MultipleChoiceQuestion
                v-if="question.type === 'multiple'"
                v-model="answers[index]"
                :question="question"
            />

            <RadioQuestion
                v-if="question.type === 'radio'"
                v-model="answers[index]"
                :question="question"
            />

            <textarea
                v-if="question.type === 'textarea'"
                v-model="answers[index]"
                placeholder="Your response..."
                rows="7"
            ></textarea>

            <input
                v-if="question.type === 'short-text'"
                v-model="answers[question.id]"
                placeholder="Your response..."
                type="text"
            >
        </div>
        <button @click="storeAnswers">
            Submit
        </button>
    </div>
</template>

<style lang="scss">
    @use '@/scss/pages/questionnaire.scss';
</style>
