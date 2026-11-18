export interface Question {
    /**
     * The question that will be displayed to the user
     */
    'question': string;

    /**
     * Any further explanation that is needed for the user to understand the question. Smaller font
     */
    'explanation'?: string;

    /**
     * The type of response to get
     */
    'type': 'radio' | 'multiple' | 'short-text' | 'textarea';

    /**
     * The options the user can pick from, ignored if short-text or textarea
     */
    'options'?: string[];

    /**
     * ID of the question. Must be unique
     */
    'id': string;

    /**
     * Question to link this to. Optional
     */
    'linkedQuestionId'?: string;
}
