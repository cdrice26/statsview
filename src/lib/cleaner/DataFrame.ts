import { applyStatistic } from '../stats/stats.js';

type StatisticName = 'mean' | 'median' | 'mode';
type ComparisonOperator = '=' | '!=' | '>' | '<' | '>=' | '<=';

const dynamicCompare = (a: number, b: number, comp: ComparisonOperator) => {
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

export class DataFrame {
  private _data: string[][];
  private _labels: string[];

  constructor(data: string[][], labels: string[]) {
    this._data = data;
    this._labels = labels;
  }

  public get data(): string[][] {
    return this._data;
  }

  public get labels(): string[] {
    return this._labels;
  }

  public removeDuplicates(): DataFrame {
    const uniqueRows = Array.from(
      new Set(this._data.map((row) => JSON.stringify(row)))
    );
    this._data = uniqueRows.map((rowString) => JSON.parse(rowString));
    return this;
  }

  public removeRowsWithEmptyValues(): DataFrame {
    this._data = this._data.filter((row) =>
      row.every((cell) => cell !== '' && cell !== null && cell !== undefined)
    );
    return this;
  }

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

  public replaceWithValue(
    columnName: string,
    comparisonOperator: ComparisonOperator,
    value: string
  ): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.map((row) => {
      if (
        dynamicCompare(
          parseFloat(row[columnIndex]),
          parseFloat(value),
          comparisonOperator
        )
      ) {
        row[columnIndex] = value;
      }
      return row;
    });
    return this;
  }

  public replaceWithStat(
    columnName: string,
    comparisonOperator: ComparisonOperator,
    statName: string
  ): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    const statistic = applyStatistic(
      this._data
        .map((row) => parseFloat(row[columnIndex]))
        .filter((x) => !isNaN(x) && x !== null && x !== undefined),
      statName
    );
    this._data = this._data.map((row) => {
      if (
        dynamicCompare(
          parseFloat(row[columnIndex]),
          statistic ?? 0,
          comparisonOperator
        )
      ) {
        row[columnIndex] =
          statistic !== null && statistic !== undefined
            ? statistic.toString()
            : '#ERROR';
      }
      return row;
    });
    return this;
  }

  public removeRowsWhere(
    columnName: string,
    comparisonOperator: ComparisonOperator,
    value: string
  ): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.filter(
      (row) =>
        !dynamicCompare(
          parseFloat(row[columnIndex]),
          parseFloat(value),
          comparisonOperator
        )
    );
    return this;
  }

  public round(columnName: string, decimalPlaces: number): DataFrame {
    const columnIndex = this._labels.indexOf(columnName);
    this._data = this._data.map((row) => {
      row[columnIndex] = parseFloat(row[columnIndex]).toFixed(decimalPlaces);
      return row;
    });
    return this;
  }
}
