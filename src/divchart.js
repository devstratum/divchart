/**
 * DivChart
 *
 * @version         1.0
 * @author          Sergey Osipov <info@devstratum.ru>
 * @website         https://devstratum.ru
 * @copyright       Copyright (c) 2022 Sergey Osipov. All Rights Reserved
 * @license         MIT License
 * Report bugs      https://github.com/devstratum/divchart/issues
 */

(function() {    
    this.DivChart = function() {
        // default options
        let defaults = {
            selector: '',
            theme: 'light',
            title: '',
            description: '',
            unit: '',
            better: '',
            type: 'number',
            separate: false,
            labels: true,
            grid_wmax: 0,
            grid_part: 5,
            points: [],
            graphs: []
        };

        // create options by extending defaults
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
    };

    // Public Methods
    DivChart.prototype.create = function() {
        createChart.call(this);
    };

    // Private Methods
    function extendDefaults(source, properties) {
        let property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        
        return source;
    }

    // create Chart
    function createChart() {
        let options = this.options;
        let grid_wmax = calcGridMax(options);
        let grid_part = options.grid_part;
        if (grid_part > 6 && (grid_part % 2) !== 0) grid_part++;

        let graph_grid = getGrid(options, grid_wmax, grid_part);
        let graph_header = getHeader(options);
        let graph_item = getChartItem(options, grid_wmax);

        let labels = '';
        if (!options.labels) labels = ' nolabels';
        let parts = '';
        if (grid_part > 6) parts = ' oddparts';
        let output = '';
        output += '<div class="divchart' + ' ' + options.theme + '">';
        output += graph_header;

        if (grid_wmax) {
            output += '<div class="divchart__body">';
            output += '<div class="graph-body' + labels + '">';
            output += '<div class="graph-body__grid' + parts + '">' + graph_grid + '</div>';
            output += '<div class="graph-body__chart">' + graph_item + '</div>';
            output += '</div>';
            output += '</div>';
        }

        output += '</div>';

        if (typeof options.selector === "string") {
            let container = document.querySelector(options.selector);
            if (container) {
                container.innerHTML = output;
            }
        }
    }

    // get Chart Items
    function getChartItem(options, grid_wmax) {
        let output = '';

        if (typeof options.graphs === 'object') {
            options.graphs.forEach(function(item) {
                output += '<div class="chart-block">';
                output += '<div class="chart-block__label"><span>' + item.label + '</span></div>';
                output += '<div class="chart-block__lines">';

                if (item.value) {
                    let index = 999;

                    item.value.forEach(function (val, i) {
                        let val_time;

                        // check type
                        if (options.type === 'time') {
                            val_time = val;
                            val = calcValueSeconds(val);
                        }

                        if (typeof val === 'number') {
                            let line_index = 'z-index:' + (index--) + ';';

                            let line_width = 'width:' + calcWidthPercent(grid_wmax, val) + '%;';

                            let line_color = '';
                            if (item.color) {
                                line_color = 'background:' + item.color[i] + ';';
                            }

                            let line_separate = 'position:absolute;';
                            if (options.separate) {
                                line_separate = 'position:relative;';
                            }

                            output += '<div class="chart-line" style="' + line_width + line_color + line_separate + line_index +'">';
                            // check type
                            if (options.type === 'time') {
                                output += '<span>' + val_time + '</span>';
                            } else {
                                output += '<span>' + val + '</span>';
                            }
                            output += '</div>';
                        }
                    });
                }

                output += '</div>';
                output += '</div>';
            });
        }

        return output;
    }

    // get Chart Points
    function getChartPoints(options) {
        let output = '';

        if (typeof options.points === 'object') {
            options.points.forEach(function(item) {
                let point_color = '';
                if (item.color) {
                    point_color = 'background:' + item.color + ';';
                }

                if (item.title) {
                    output += '<div class="info-point">';
                    output += '<div class="info-point__color"><span style="' + point_color + '"></span></div>';
                    output += '<div class="info-point__title">' + item.title + '</div>';
                    output += '</div>';
                }
            });
        }

        return output;
    }

    // get Header
    function getHeader(options) {
        let output = '';

        output += '<div class="divchart__header">';
        output += '<div class="graph-header">';

        if (options.title) {
            output += '<div class="graph-header__title">' + options.title + '</div>';
        }

        output += '<div class="graph-header__info">';

        if (options.unit) {
            output += '<div class="info-unit">' + options.unit + '</div>';
        }

        let graph_points = getChartPoints(options);

        if (graph_points) {
            output += '<div class="info-points">';
            output += graph_points;
            output += '</div>';
        }

        if (options.better) {
            output += '<div class="info-better">' + options.better + '</div>';
        }

        output += '</div>';

        if (options.description) {
            output += '<div class="graph-header__descr">' + options.description + '</div>';
        }

        output += '</div>';
        output += '</div>';

        return output;
    }

    // get Grid
    function getGrid(options, grid_wmax, grid_part) {
        let output = '';
        output += '<div class="grid-line-crs"></div>';
        output += calcGridStep(options, grid_wmax, grid_part);

        if (options.type === 'time') {
            grid_wmax = getValueTime(grid_wmax);
        }

        output += '<div class="grid-line-end"><span>' + grid_wmax + '</span></div>';
        
        return output;
    }

    // calc Grid Step
    function calcGridStep(options, grid_wmax, grid_part) {
        let i = 0;
        let output = '';
        let offset = 100 / grid_part;
        let grid_step = Math.round(grid_wmax / grid_part);
        while (grid_part > i) {
            let percent = Math.floor(i * offset);
            let val = i * grid_step;

            if (options.type === 'time') {
                val = getValueTime(val);
                if (i === 0) val = 0;
            }

            output += '<div class="grid-line line-' + (i + 1) + '" style="left:' + percent + '%;"><span>' + val + '</span></div>';
            i++;
        }

        return output;
    }

    // calc Grid Max
    function calcGridMax(options) {
        let output = 0;

        if (options.grid_wmax && options.type === 'time') {
            options.grid_wmax = calcValueSeconds(options.grid_wmax);
        }

        if (options.grid_wmax && typeof options.grid_wmax === 'number') {
            output = options.grid_wmax;
        } else {
            let bufer_max = 0;
            if (typeof options.graphs === 'object') {
                options.graphs.forEach(function(item) {
                    item.value.forEach(function(val) {
                        // check type
                        if (options.type === 'time') {
                            val = calcValueSeconds(val);
                        }
                        if (val > bufer_max) {
                            bufer_max = val;
                        }
                    });
                });
            }

            if (bufer_max > 100) {
                output = Math.ceil(bufer_max / 100) * 100;
            } else {
                output = Math.ceil(bufer_max);
            }
        }

        return output;
    }

    // calc Value Time
    function getValueTime(sec) {
        let time_string = '';
        let hours = Math.floor(sec / 60 / 60);
        let minutes = Math.floor(sec / 60) - (hours * 60);
        let seconds = sec % 60;

        function setDigit(num) {
            let output = num;
            if (num < 10) {
                output = '0' + num;
            }
            return output;
        }

        if (hours > 0) time_string += setDigit(hours) + ':';
        time_string += setDigit(minutes) + ':' + setDigit(seconds);

        return time_string;
    }

    // calc Value Seconds
    function calcValueSeconds(val) {
        let seconds = 0;
        let time_array = val.split(':');
        time_array.reverse();

        // hours
        if (time_array[2]) {
            seconds = seconds + (Number(time_array[2]) * 3600);
        }
        // minutes
        if (time_array[1]) {
            seconds = seconds + (Number(time_array[1]) * 60);
        }
        // seconds
        if (time_array[0]) {
            seconds = seconds + Number(time_array[0]);
        }

        return seconds;
    }

    // calc Width Percent
    function calcWidthPercent(grid_wmax, val) {
        let percent = (val / grid_wmax) * 100;
        return percent.toFixed(4);
    }
}());