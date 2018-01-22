import { Component, Injectable, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {

  //选中值输出给父节事件
  @Output() selectedOutEvent = new EventEmitter();

  //默认选中省市县数据，父组件传递过来
  @Input() selectedItems: any =
    {
      province: '',//省
      city: '',//市
      county: ''//县
    };
  //定义并初始化数据集
  provinceData: any[] = [];
  cityData: any[] = [];
  countyData: any[] = [];

  //构造函数
  constructor(private _http: Http) { };
  //页面初始化
  ngOnInit() {
    this._http.get('mock-data/pca-code.json')
      .subscribe(result => {
        result = result.json();
        //添加默认请选中项
        this.provinceData =
          [{
            label: '--请选择--', value: ''
          }];
        //重组数据
        _.map(result, item => {
          var rs = {
            label: item.name,
            value: item.code
          };
          this.provinceData.push(rs);
        });

      });

    //加载省市县数据
    this.provinceChange();
    this.cityChange();
    this.countyChange();
  };

  //选择省份, 查询相应的市
  provinceChange() {
    //清空一下数据      
    this.cityData = [];
    this.countyData = [];
    this.selectedItems.city = '';
    this.selectedItems.county = '';
    //选择省份的时候发射省份给父组件        
    this.selectedOutEvent.emit(this.selectedItems);
    //父节点Code
    var pcode = this.selectedItems.province;
    //请求加载省对应的市数据
    this._http.get('mock-data/pca-code.json')
      .subscribe(result => {
        result = result.json();
        //添加默认请选中项
        this.cityData =
          [{
            label: '--请选择--', value: ''
          }];
        //根据父节点Code得到对应的市节点
        var childs = _.find(result, function (chl) {
          return chl.code == pcode;
        });
        if (childs == null) return;
        //重组数据
        _.map(childs.childs, item => {
          var rs = {
            label: item.name,
            value: item.code
          };
          this.cityData.push(rs);
        });

      });
  };

  //选择市, 查询相应的县
  cityChange() {
    //清空一下数据
    this.countyData = [];
    this.selectedItems.county = '';
    // 选择市的时候发射市给父组件
    this.selectedOutEvent.emit(this.selectedItems);
    //父节点Code
    var pcode = this.selectedItems.city;
    var provinceCode = this.selectedItems.province;
    //请求加载市对应的县数据
    this._http.get('mock-data/pca-code.json')
      .subscribe(result => {
        result = result.json();
        //添加默认请选中项
        this.countyData =
          [{
            label: '--请选择--', value: ''
          }];
        //根据父节点Code得到对应的市节点
        //以下获取数据根据情况修改，此处以json文件的层级来获取的，不太合适。。。
        //选中的省节点
        var selectedProvince = _.find(result, function (chl) {
          return chl.code == provinceCode;
        });
        if (selectedProvince == null) return;
        //选中的市节点
        var childs = _.find(selectedProvince.childs, function (chl) {
          return chl.code == pcode;
        });
        if (childs == null) return;
        //重组数据
        _.map(childs.childs, item => {
          var rs = {
            label: item.name,
            value: item.code
          };
          this.countyData.push(rs);
        });
      });
  };

  //选择县触发发射县给父组件
  countyChange() {
    this.selectedOutEvent.emit(this.selectedItems);
  };
}    
