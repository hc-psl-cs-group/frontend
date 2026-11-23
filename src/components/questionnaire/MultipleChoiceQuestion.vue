<script setup lang="ts">
    import {
        type Ref,
        ref,
        watch
    } from 'vue';
    import type {
        Question
    } from '@/ts/form';
    import SwitchOption from '../elements/SwitchOption.vue';

    const props = defineProps<{
        'question': Question
    }>();
    const answer = defineModel<string>();
    const selected: Ref<boolean[]> = ref( [] );

    watch( props, () => {
        selected.value = props.question.options?.map( () => false ) ?? [];
    } );

    watch( selected, () => {
        answer.value = selected.value.join( ', ' );
    } );
</script>

<template>
    <div style="width: 100%;">
        <SwitchOption
            v-for="(item, index) in question.options!"
            :key="index"
            v-model="selected[index]"
            :text="item"
            label-last
        />
    </div>
</template>
