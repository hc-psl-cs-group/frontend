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
    <table>
        <tbody>
            <tr
                v-for="(option, index) in props.question.options!"
                :key="index"
            >
                <td>
                    <input
                        :id="question.id + '-option-' + index"
                        v-model="answer"
                        type="radio"
                        :name="question.id"
                        :value="option"
                    >
                </td>
                <td>
                    <label :for="question.id + '-option-' + index">{{ option }}</label>
                </td>
            </tr>
        </tbody>
    </table>
</template>
