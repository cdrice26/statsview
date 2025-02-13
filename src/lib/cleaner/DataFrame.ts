import { applyStatistic } from '../stats/stats.js';

type StatisticName = 'mean' | 'median' | 'mode';
type ComparisonOperator = '=' | '!=' | '>' | '<' | '>=' | '<=';

/**
 * Performs a dynamic comparison between two numbers or strings.
 * @param a - The first number or string to compare.
 * @param b - The second number or string to compare.
 * @param comp - The comparison operator.
 * @returns True if the comparison is true, false otherwise.
 */
const dynamicCompare = (
  a: number | string,
  b: number | string,
  comp: ComparisonOperator
) => {
  const numA = typeof a === 'string' ? parseFloat(a) : a;
  const numB = typeof b === 'string' ? parseFloat(b) : b;

  if (!isNaN(numA as number) && !isNaN(numB as number)) {
    a = numA;
    b = numB;
  }

  try {
    switch (comp) {
      case '=':
        return a === b;
      case '!=':
        return a !== b;
      case '>':
        return a > b;
      case '<':
        return a < b;
      case '>=':
        return a >= b;
      case '<=':
        return a <= b;
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
};

/**
 * Represents a data frame with rows and column labels, providing methods for data manipulation.
 */
export class DataFrame {
  /**
   * The data contained in the data frame.
   * @private
   */
  private _data: string[][];

  /**
   * The column labels of the data frame.
   * @private
   */
  private _labels: string[];

  /**
   * Creates a new data frame with the specified data and labels.
   * @param data - The data of the new data frame.
   * @param labels - The labels of the new data frame.
   */
  constructor(data: string[][], labels: string[]) {
    this._data = data;
    this._labels = labels;
  }

  /**
   * The data contained in the data frame.
   */
  public get data(): string[][] {
    return this._data;
  }

  /**
   * The column labels of the data frame.
   */
  public get labels(): string[] {
    return this._labels;
  }

  /**
   * Removes duplicate rows from the data frame.
   * @returns A new data frame with duplicate rows removed.
   */
  public removeDuplicates(): DataFrame {
    const uniqueRows = Array.from(
      new Set(this._data.map((row) => JSON.stringify(row)))
    );
    this._data = uniqueRows.map((rowString) => JSON.parse(rowString));
    return this;
  }

  /**
   * Removes rows from the data frame that have empty values.
   * @returns A new data frame with empty rows removed.
   */
  public removeRowsWithEmptyValues(): DataFrame {
    this._data = this._data.filter((row) =>
      row.every((cell) => cell !== '' && cell !== null && cell !== undefined)
    );
    return this;
  }

  /**
   * Fills empty cells with a specified value.
   * @param columnName - The name of the column to fill.
   * @param value - The value to fill the empty cells with.
   * @returns A new data frame with the empty cells filled.
   */
  public fillEmpty(columnName: string, value: string): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.map((row) => {
      if (
        row[columnIndex] === '' ||
        row[columnIndex] === null ||
        row[columnIndex] === undefined
      ) {
        row[columnIndex] = value;
      }
      return row;
    });
    return this;
  }

  /**
   * Fills empty cells with the specified statistic.
   * @param columnName - The name of the column to fill.
   * @param statName - The name of the statistic to use.
   * @returns A new data frame with the empty cells filled.
   */
  public fillEmptyStat(columnName: string, statName: StatisticName): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.map((row) => {
      if (
        row[columnIndex] === '' ||
        row[columnIndex] === null ||
        row[columnIndex] === undefined
      ) {
        try {
          row[columnIndex] =
            applyStatistic(
              this._data
                .map((row) => parseFloat(row[columnIndex]))
                .filter((x) => !isNaN(x) && x !== null && x !== undefined),
              statName
            )?.toString() ?? '#ERROR';
        } catch (e) {
          row[columnIndex] = '#ERROR';
        }
      }
      return row;
    });
    return this;
  }

  /**
   * Replaces values in a column with a specified value if a condition is met.
   * @param columnName - The name of the column to replace.
   * @param comparisonOperator - The comparison operator to use.
   * @param value - The value to compare the cells to.
   * @param replaceWith - The value to replace the cells with.
   * @returns A new data frame with the cells replaced.
   */
  public replaceWithValue(
    columnName: string,
    comparisonOperator: ComparisonOperator,
    value: string,
    replaceWith: string
  ): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.map((row) => {
      if (dynamicCompare(row[columnIndex], value, comparisonOperator)) {
        row[columnIndex] = replaceWith;
      }
      return row;
    });
    return this;
  }

  /**
   * Replaces values in a column with the specified statistic if a condition is met.
   * @param columnName - The name of the column to replace.
   * @param comparisonOperator - The comparison operator to use.
   * @param value - The value to compare the cells to.
   * @param statName - The name of the statistic to use.
   * @returns A new data frame with the cells replaced.
   */
  public replaceWithStat(
    columnName: string,
    comparisonOperator: ComparisonOperator,
    value: string,
    statName: StatisticName
  ): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    const statistic = applyStatistic(
      this._data
        .map((row) => parseFloat(row[columnIndex]))
        .filter((x) => !isNaN(x) && x !== null && x !== undefined),
      statName
    );
    this._data = this._data.map((row) => {
      if (dynamicCompare(row[columnIndex], value, comparisonOperator)) {
        row[columnIndex] =
          statistic !== null && statistic !== undefined
            ? statistic.toString()
            : '#ERROR';
      }
      return row;
    });
    return this;
  }

  /**
   * Removes rows from the data frame where a condition is met.
   * @param columnName - The name of the column to check.
   * @param comparisonOperator - The comparison operator to use.
   * @param value - The value to compare the cells to.
   * @returns A new data frame with the rows removed.
   */
  public removeRowsWhere(
    columnName: string,
    comparisonOperator: ComparisonOperator,
    value: string
  ): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.filter(
      (row) => !dynamicCompare(row[columnIndex], value, comparisonOperator)
    );
    return this;
  }

  /**
   * Rounds the values in a column to a specified number of decimal places.
   * @param columnName - The name of the column to round.
   * @param decimalPlaces - The number of decimal places to round to.
   * @returns A new data frame with the values rounded.
   */
  public round(columnName: string, decimalPlaces: number): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.map((row) => {
      row[columnIndex] = parseFloat(row[columnIndex]).toFixed(decimalPlaces);
      return row;
    });
    return this;
  }
}
