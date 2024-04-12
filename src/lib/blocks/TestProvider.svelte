<script>
    import TestBlock from './TestBlock.svelte';
    import { getData, getFullData } from '../stats/getData';
    import {
        X2GOFTest,
        X2IndTest,
        Samp2TTest,
        MPTTest,
        Samp1TTest,
        Samp2ZTest,
        Samp1ZTest
    } from '../stats/tests';

    export let props;
    export let tableBlocks;
    // sourceBlock is the table in tableBlocks whose title is equal to props.sources
    $: sourceBlock =
        tableBlocks.length > 0
            ? tableBlocks.filter((table) => table.title == props.sources)[0]
            : null;

    // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 1 of a test
    $: data =
        sourceBlock != null
            ? getData(
                  sourceBlock.content,
                  props.col,
                  sourceBlock.hasHeaders,
                  props.testType != null
                      ? props.testType.includes('TTest')
                          ? 'Quantitative'
                          : props.testType.includes('ZTest')
                            ? 'Binary'
                            : 'Categorical'
                      : null
              )
            : null;
    // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 2 of a test
    $: data2 =
        sourceBlock != null && props.col2 != null
            ? getData(
                  sourceBlock.content,
                  props.col2,
                  sourceBlock.hasHeaders,
                  props.testType != null
                      ? props.testType.includes('TTest')
                          ? 'Quantitative'
                          : props.testType.includes('ZTest')
                            ? 'Binary'
                            : 'Categorical'
                      : null
              )
            : null;

    export let setFocus = (focus) => {};
</script>

<TestBlock
    {props}
    {setFocus}
    testResults={data != null
        ? props.testType == 'X2GOFTest'
            ? X2GOFTest(data, props.testData.expCounts, props.testData.alpha)
            : props.testType == 'X2IndTest'
              ? X2IndTest(
                    getFullData(sourceBlock.content, sourceBlock.hasHeaders),
                    props.testData.alpha
                )
              : props.testType == '2SampTTest'
                ? Samp2TTest(
                      data,
                      data2,
                      props.testData.tails,
                      props.testData.alpha
                  )
                : props.testType == 'MPTTest'
                  ? MPTTest(
                        data,
                        data2,
                        props.testData.tails,
                        props.testData.alpha
                    )
                  : props.testType == '1SampTTest'
                    ? Samp1TTest(
                          data,
                          props.testData.testAgainst,
                          props.testData.tails,
                          props.testData.alpha
                      )
                    : props.testType == '2SampZTest'
                      ? Samp2ZTest(
                            data,
                            data2,
                            props.testData.tails,
                            props.testData.alpha
                        )
                      : props.testType == '1SampZTest'
                        ? Samp1ZTest(
                              data,
                              props.testData.testAgainst,
                              props.testData.tails,
                              props.testData.alpha
                          )
                        : null
        : null}
/>
