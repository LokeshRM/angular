import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { EChartsOption } from 'echarts';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent {
  options: Observable<EChartsOption>;
  constructor(private http: HttpClient) {}
  menuTopLeftPosition =  {x: 0, y: 0}
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  onChartClick(ec : any){
    console.log(ec.event.event);
      this.menuTopLeftPosition.x = ec.event.event.clientX;
      this.menuTopLeftPosition.y = ec.event.event.clientY;
      this.matMenuTrigger.openMenu();
  }
  onChartrightClick(ec : any){
    console.log(ec.event.event);
    window.open("//www.google.com", "_blank");
  }

  ngOnInit(): void {
    this.options = this.http.get<any>('https://third-picturesque-stew.glitch.me/datai', { responseType: 'json' }).pipe(
      map(data => {
        data.children.forEach(function (
          datum: { collapsed: boolean },
          index: number
        ) {
          index % 2 === 0 && (datum.collapsed = true);
        });
        return {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: '<h3>{b}</h3>{c}',
            backgroundColor : 'rgba(50,50,50,0.2)',
            padding: [
                2,  
                3, 
                2,  
                3, 
            ]

          },
          series: [
            { itemStyle : {
                
            },
              type: 'tree',
              data: [data],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              roam : true,
              emphasis: {
                focus: 'series',
                blurScope: 'global'
            },
              edgeShape : "polyline",
              edgeForkPosition : "10%",
              symbolSize: 30,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9,
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left',
                },
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        };
      })
    );
  }
}
