<script setup lang="ts">
    import type {
        Question
    } from '@/ts/form';
    import {
        ref
    } from 'vue';

    const props = defineProps<{
        'question': Question
    }>();
    const answer = defineModel<string>();
    const id = ref( String( Math.random() ) );
</script>

<template>
    <div>
        <p>Radio</p>
        <div>
            <div
                v-for="(option, index) in props.question.options!"
                :key="index"
            >
                <label :for="id + '-option-' + index">{{ option }}</label>
                <input
                    v-model="answer"
                    type="radio"
                    :name="id"
                    :value="option"
                >
            </div>
        </div>
    </div>
</template>
