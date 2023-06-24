import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { EChartsOption } from 'echarts';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css'],
})

export class GraphComponent {
    options: Observable<EChartsOption>;
    constructor(private http: HttpClient) {}
    menuTopLeftPosition = { x: 0, y: 0 };
    @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

    onChartClick(ec: any) {
        console.log(ec.event.event);
        this.menuTopLeftPosition.x = ec.event.event.clientX;
        this.menuTopLeftPosition.y = ec.event.event.clientY;
        this.matMenuTrigger.openMenu();
    }
    onChartrightClick(ec: any) {
        console.log(ec.event.event);
        window.open('//www.google.com', '_blank');
    }

    ngOnInit(): void {
        this.options = this.http
            .get<any>('https://jsonhost.glitch.me/data', {
                responseType: 'json',
            })
            .pipe(
                map((data) => {
                    return {
                        tooltip: {},
                        animationDurationUpdate: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                type: 'graph',
                                layout: 'circular',
                                symbolSize: 50,
                                roam: true,
                                circular: {
                                    rotateLabel: true
                                  },
                                  emphasis : {
                                    focus : "adjacency",
                                    blurScope: 'global',
                                    itemStyle: {
                                        color : "#000"
                                    },
                                    lineStyle: {
                                        color : "#000"
                                    }
                                  },
                                blur : {
                                    lineStyle:{
                                        color : "#fff", 
                                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        shadowBlur: 10,
                                        curveness : 0.2
                                    }
                                },
                                label: {
                                    show: true,
                                },
                                edgeSymbol: ['circle', 'arrow'],
                                edgeSymbolSize: [4, 10],
                                edgeLabel: {
                                    fontSize: 20,
                                },
                                data: data.nodes,
                                links: data.links,
                                lineStyle: {
                                    opacity: 0.9,
                                    width: 2,
                                },
                            },
                        ],
                    };
                })
            );
    }
}
