# DivChart

A simple JavaScript charts, graphs generator with output to html blocks.

## Features

* Generation in html blocks
* Responsive design
* Color theme: Light | Dark

## Donate

You can support the author's products and new projects

* [Donate via QIWI](https://my.qiwi.com/Sergei-OGTEJOc8mG)
* [Donate via CloudTips](https://pay.cloudtips.ru/p/1daecc1f)

## Usage

Include local javascript and css files in html doc

```html
<link href="/css/divchart.min.css" rel="stylesheet" type="text/css"/>
<script src="/js/divchart.min.js" type="text/javascript"></script>
```
Create a new DivChart object with the necessary parameters and call the create method to generate it:

```html
<script>
    let chart = new DivChart({
        /* example options */
        selector: '#chart',
        theme: 'dark',
        title: 'Example Chart',
        description: 'Description for example chart',
        unit: 'Score',
        better: 'Better ->',
        type: 'number',
        separate: false,
        labels: true,
        grid_wmax: 100,
        grid_part: 5,
        points: [
            {
                title: 'Simple point',
                color: '#AA0000'
            }
        ],
        graphs: [
            {
                label: 'Simple object',
                color: [
                    '#AA0000'
                ],
                value: [
                    78
                ]
            },
        ]
    });

    chart.create();
</script>
```

## Examples

![demo 3dmark](https://github.com/devstratum/divchart/blob/main/divchart-3dmark.png)

```html
<div id="chart_01"></div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        let color_blue = '#4c8ffc';
        let color_green = '#4f9100';
        let color_orange = '#e76100';

        let chart_01 = new DivChart({
            selector: '#chart_01',
            title: '3DMark 2.7.6',
            description: 'Fire Strike 1920 x 1080 (Radeon RX 470 4GB)',
            unit: 'Score',
            better: 'Better »',
            grid_wmax: 10000,
            grid_part: 10,
            points: [
                {
                    title: 'Combined',
                    color: color_blue
                },
                {
                    title: 'CPU',
                    color: color_green
                },
                {
                    title: 'Overall',
                    color: color_orange
                }
            ],
            graphs: [
                {
                    label: 'Phenom II X6 1055T',
                    color: [
                        color_blue,
                        color_green,
                        color_orange
                    ],
                    value: [
                        3069,
                        5999,
                        8252,
                    ]
                },
                {
                    label: 'Xeon E5450',
                    color: [
                        color_blue,
                        color_green,
                        color_orange
                    ],
                    value: [
                        2863,
                        5120,
                        7927,
                    ]
                },
                {
                    label: 'Core i5-3470',
                    color: [
                        color_blue,
                        color_green,
                        color_orange
                    ],
                    value: [
                        4047,
                        6489,
                        9143,
                    ]
                }
            ]
        });
  
        chart_01.create();
    });
</script>
```
![demo blender](https://github.com/devstratum/divchart/blob/main/divchart-blender.png)

```html
<div id="chart_02"></div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        let color_blue = '#4c8ffc';
        let color_red = '#cc0000';

        let chart_02 = new DivChart({
            selector: '#chart_02',
            title: 'Blender 2.79b',
            unit: 'Time Min:Sec',
            better: '« Better',
            grid_wmax: '13:00',
            type: 'time',
            points: [
                {
                    title: 'Samples 150',
                    color: color_blue
                },
                {
                    title: 'Samples 600',
                    color: color_red
                }
            ],
            graphs: [
                {
                    label: 'Phenom II X6 1055T',
                    color: [
                        color_blue,
                        color_red
                    ],
                    value: [
                        '02:19',
                        '09:09'
                    ]
                },
                {
                    label: 'Xeon E5450',
                    color: [
                        color_blue,
                        color_red
                    ],
                    value: [
                        '03:07',
                        '12:22'
                    ]
                },
                {
                    label: 'Core i5-3470',
                    color: [
                        color_blue,
                        color_red
                    ],
                    value: [
                        '01:28',
                        '05:48'
                    ]
                }
            ]
        });
  
        chart_02.create();
    });
</script>
```
![demo blender](https://github.com/devstratum/divchart/blob/main/divchart-cinebench.png)

```html
<div id="chart_03"></div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        let color_sc_1 = '#ff0000';
        let color_mt_1 = '#c30000';
        let color_sc_2 = '#1461a5';
        let color_mt_2 = '#14407a';
        let color_sc_3 = '#4c8ffc';
        let color_mt_3 = '#3a56b9';

        let chart_03 = new DivChart({
            selector: '#chart_03',
            title: 'Cinebench R15.038',
            description: 'Single Core and Multi-Thread score',
            unit: 'Score',
            better: 'Better »',
            labels: false,
            separate: true,
            points: [
                {
                    title: 'X6 1055T (SC)',
                    color: color_sc_1
                },
                {
                    title: 'X6 1055T (MT)',
                    color: color_mt_1
                },
                {
                    title: 'E5450 (SC)',
                    color: color_sc_2
                },
                {
                    title: 'E5450 (MT)',
                    color: color_mt_2
                },
                {
                    title: 'i5-3470 (SC)',
                    color: color_sc_3
                },
                {
                    title: 'i5-3470 (MT)',
                    color: color_mt_3
                }
            ],
            graphs: [
                {
                    label: 'Phenom II X6 1055T',
                    color: [
                        color_sc_1,
                        color_mt_1
                    ],
                    value: [
                        84,
                        427
                    ]
                },
                {
                    label: 'Xeon E5450',
                    color: [
                        color_sc_2,
                        color_mt_2
                    ],
                    value: [
                        86,
                        328
                    ]
                },
                {
                    label: 'Core i5-3470',
                    color: [
                        color_sc_3,
                        color_mt_3
                    ],
                    value: [
                        132,
                        481
                    ]
                }
            ]
        });
  
        chart_03.create();
    });
</script>
```
![demo vray](https://github.com/devstratum/divchart/blob/main/divchart-vray.png)

```html
<div id="chart_04"></div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        let color_orange = '#e76100';

        let chart_04 = new DivChart({
            selector: '#chart_04',
            theme: 'dark',
            title: 'V-Ray Benchmark 1.0.1',
            unit: 'Time Min:Sec',
            better: '« Better',
            grid_wmax: '08:00',
            type: 'time',
            graphs: [
                {
                    label: 'Phenom II X6 1055T',
                    color: [
                        color_orange
                    ],
                    value: [
                        '05:36'
                    ]
                },
                {
                    label: 'Xeon E5450',
                    color: [
                        color_orange
                    ],
                    value: [
                        '07:50'
                    ]
                },
                {
                    label: 'Core i5-3470',
                    color: [
                        color_orange
                    ],
                    value: [
                        '05:37'
                    ]
                }
            ]
        });
  
        chart_04.create();
    });
</script>
```

## Options

**selector**

* Type: string
* Default: none
* CSS block selector for output, for example: '.selector', '#chart'

**theme**

* Type: string
* Default: light
* Color theme, light or dark

**title**

* Type: string
* Default: none
* Chart title

**description**

* Type: string
* Default: none
* Chart description

**unit**

* Type: string
* Default: none
* Text Unit, for example: Score, Seconds, Price

**better**

* Type: string
* Default: none
* Text, which values are better, higher or lower

**type**
* Type: string
* Default: number
* Data type, number or time

**separate**

* Type: boolean
* Default: false
* Separating the output of chart rows, true or false

**labels**

* Type: boolen
* Default: true
* View labels, true or false

**grid_wmax**
* Type: int
* Default: 0
* Maximum range of chart grid units

**grid_part**

* Type: int
* Default: 5
* Number of parts of grid graph

**points**

* Type: object
* Default: none
* An object of points of different dimensions of the chart with the parameters of names and colors

**graphs**

* Type: object
* Default: none
* Chart Row Object with Label, Colors and Value parameters

## Info

Version: 1.1  
License: MIT License  
Author: Sergey Osipov  
Website: https://devstratum.ru  
Email: info@devstratum.ru  
