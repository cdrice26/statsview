<script>
    import TextBlock from './TextBlock.svelte';
    import { mean, std, median, iqr, min, max, range } from '../stats/stats';
    import { getData } from '../stats/getData';

    export let props;
    export let tableBlocks;
    // sourceBlock is the table in tableBlocks whose title is equal to props.sources
    $: sourceBlock =
        tableBlocks.length > 0
            ? tableBlocks.filter((table) => table.title == props.sources)[0]
            : null;
    export let setFocus = (props) => {};
</script>

<!--We use a TextBlock to display the statistics. This code first checks the statistic we want to calculate
    and outputs its name into the TextBlock. Then it checks to make sure we have data to calculate the statistic.
    If we don't, it outputs 'Source Configuration Required'. If we do, it calculates the statistic for the given
    column of the given table and then prints that out into the TextBlock.-->
<TextBlock
    props={{
        ...props,
        content:
            props.statType == 'Mean'
                ? 'Mean' +
                  (props.sources != null // If there's a source
                      ? ' of ' +
                        props.col +
                        ': ' +
                        mean(
                            getData(
                                sourceBlock.content,
                                props.col,
                                sourceBlock.hasHeaders,
                                'Quantitative'
                            )
                        ) // Display the mean
                      : ': Source Configuration Required') // Otherwise notify that there is no source
                : props.statType == 'StDev'
                  ? 'Standard Deviation' +
                    (props.sources != null && props.col != null
                        ? ' of ' +
                          props.col +
                          ': ' +
                          std(
                              getData(
                                  sourceBlock.content,
                                  props.col,
                                  sourceBlock.hasHeaders,
                                  'Quantitative'
                              )
                          )
                        : ': Source Configuration Required')
                  : props.statType == 'Median'
                    ? 'Median' +
                      (props.sources != null && props.col != null
                          ? ' of ' +
                            props.col +
                            ': ' +
                            median(
                                getData(
                                    sourceBlock.content,
                                    props.col,
                                    sourceBlock.hasHeaders,
                                    'Quantitative'
                                )
                            )
                          : ': Source Configuration Required')
                    : props.statType == 'IQR'
                      ? 'IQR' +
                        (props.sources != null && props.col != null
                            ? ' of ' +
                              props.col +
                              ': ' +
                              iqr(
                                  getData(
                                      sourceBlock.content,
                                      props.col,
                                      sourceBlock.hasHeaders,
                                      'Quantitative'
                                  )
                              )
                            : ': Source Configuration Required')
                      : props.statType == 'Min'
                        ? 'Minimum' +
                          (props.sources != null && props.col != null
                              ? ' of ' +
                                props.col +
                                ': ' +
                                min(
                                    getData(
                                        sourceBlock.content,
                                        props.col,
                                        sourceBlock.hasHeaders,
                                        'Quantitative'
                                    )
                                )
                              : ': Source Configuration Required')
                        : props.statType == 'Max'
                          ? 'Maximum' +
                            (props.sources != null && props.col != null
                                ? ' of ' +
                                  props.col +
                                  ': ' +
                                  max(
                                      getData(
                                          sourceBlock.content,
                                          props.col,
                                          sourceBlock.hasHeaders,
                                          'Quantitative'
                                      )
                                  )
                                : ': Source Configuration Required')
                          : props.statType == 'Range'
                            ? 'Range' +
                              (props.sources != null && props.col != null
                                  ? ' of ' +
                                    props.col +
                                    ': ' +
                                    range(
                                        getData(
                                            sourceBlock.content,
                                            props.col,
                                            sourceBlock.hasHeaders,
                                            'Quantitative'
                                        )
                                    )
                                  : ': Source Configuration Required')
                            : 'Configuration Required'
    }}
    setFocus={() => setFocus(props)}
/>
