<script>
  import { getData } from '../stats/getData';
  import TextBlock from './TextBlock.svelte';

  export let props;
  export let sourceBlock;

  // The results of the test to display here
  export let testResults;

  export let setFocus = (focus) => {};
</script>

<TextBlock
  props={{
    ...props,
    content:
      // Check to make sure there's sources and a testType, otherwise we won't be able to render results
      props.sources != null && props.testType != null && testResults != null
        ? `
        <strong> ${
          // Replace the value name with the actual name of the test and render it
          props.testType
            .replace('X2', 'Chi-Squared ')
            .replace('GOF', 'Goodness of Fit ')
            .replace('Ind', 'Independence ')
            .replace('Samp', '-Sample ')
            .replace('TTest', 'T-Test')
            .replace('ZTest', 'Z-Test')
            .replace('MP', 'Matched Pairs ')

          // Print the identifiers for the column/table we're dealing with
        } for ${
          props.testType == 'X2IndTest'
            ? ''
            : props.col +
              (props.testType.includes('2Samp') || props.testType.includes('MP')
                ? ` vs. ${props.col2} `
                : '') +
              ' of '
        } ${props.sources}<br><br>
        
        </strong>${
          // Chi-Squared GOF test: print the expected counts
          props.testType == 'X2GOFTest'
            ? `Expected Counts: ${props.testData.expCounts}<br><br>`
            : ''
        }

        Null Hypothesis: ${props.testData.h0}<br>
        Alternative Hypothesis: ${props.testData.ha}<br><br>

        Random Sample: ${props.testData.rand}<br>
        Large Counts: ${
          props.testType == 'X2GOFTest'
            ? props.testData.expCounts.every((x) => x > 5)
            : props.testType == 'X2IndTest'
              ? testResults.expected._buffer.every((x) => x > 5)
              : props.testType.includes('TTest')
                ? props.col
                  ? getData(
                      sourceBlock.content,
                      props.col,
                      sourceBlock.hasHeaders,
                      'Quantitative'
                    ).length > 30 &&
                    (props.col2
                      ? getData(
                          sourceBlock.content,
                          props.col2,
                          sourceBlock.hasHeaders,
                          'Quantitative'
                        ).length > 30
                      : true)
                  : sourceBlock.content.length > 30
                : props.testType == '1SampZTest'
                  ? getData(
                      sourceBlock.content,
                      props.col,
                      sourceBlock.hasHeaders,
                      'Binary'
                    ).filter((x) => x == 1).length > 10 &&
                    getData(
                      sourceBlock.content,
                      props.col,
                      sourceBlock.hasHeaders,
                      'Binary'
                    ).filter((x) => x == 0).length > 10
                  : props.testType == '2SampZTest'
                    ? getData(
                        sourceBlock.content,
                        props.col,
                        sourceBlock.hasHeaders,
                        'Binary'
                      ).filter((x) => x == 1).length > 10 &&
                      getData(
                        sourceBlock.content,
                        props.col,
                        sourceBlock.hasHeaders,
                        'Binary'
                      ).filter((x) => x == 0).length > 10 &&
                      getData(
                        sourceBlock.content,
                        props.col2,
                        sourceBlock.hasHeaders,
                        'Binary'
                      ).filter((x) => x == 1).length > 10 &&
                      getData(
                        sourceBlock.content,
                        props.col2,
                        sourceBlock.hasHeaders,
                        'Binary'
                      ).filter((x) => x == 0).length > 10
                    : null
        }<br><br>

        Two Tailed: ${props.testData.tails}<br><br>

        Test Statistic: ${testResults.testStatistic}<br>
        P-Value: ${testResults.pValue}<br><br>

        Because the p-value is ${
          testResults.pValue < props.testData.alpha ? 'less' : 'greater'
        } than the significance level of 
        ${props.testData.alpha}, there is ${
          testResults.pValue < props.testData.alpha ? '' : 'no '
        }significant evidence to reject the null 
        hypothesis and accept that ${props.testData.ha}

`
        : 'Configuration Required'
  }}
  setFocus={() => setFocus(props)}
/>
