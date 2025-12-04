export interface Chat {
    _id?: string; 
    userId: string;
    title: string;
    creationDate: Date;
    lastModificationDate: Date;
    messages: ModelMessage[];
}

type GenerationConfig = CallSettings & Prompt & {
    /**
     *  The language model to use.
     */
    model: LanguageModel;

    /**
     * The tools that the model can call. The model needs to support calling tools.
    */
    tools?: TOOLS;

    /**
     * Condition for stopping the generation when there are tool results in the last step.
     * When the condition is an array, any of the conditions can be met to stop the generation.
     * @default stepCountIs(1)
     */
    stopWhen?: StopCondition<NoInfer<TOOLS>> | Array<StopCondition<NoInfer<TOOLS>>>;

    /**
     *Optional function that you can use to provide different settings for a step.
     */
    prepareStep?: PrepareStepFunction<NoInfer<TOOLS>>;

    /**
     * Callback that is called when each step (LLM call) is finished, including intermediate steps.
     */
    onStepFinish?: GenerateTextOnStepFinishCallback<NoInfer<TOOLS>>;

    /**
     * Callback that is called at the end of a stream generation.
     */
    onFinish?: StreamTextOnFinishCallback<ToolSet>;
}
