import React, { useState } from 'react';
import { Card, Button, Spin, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import { encodeImg } from '../util';
import CHART_SAMPLES, { Chart } from '../consts/chartSamples';
import ChartView from './ChartView';
import './index.less';

const { SubMenu } = Menu;

const VisCard = ({ setEncodedImg }: { setEncodedImg: (image: string) => void }) => {
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [curChartSamp, setCurChartSamp] = useState<Chart>(CHART_SAMPLES[0].charts[0]);
  const [chartObj, setChartObj] = useState<any>();

  const getChartObj = (chartObj: any) => {
    setChartObj(chartObj);
  };

  const handleEncodeBtn = () => {
    setStopUploadImg(true);
    html2canvas(chartObj.ele, {
      // backgroundColor: 'white',
    }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      // downloadPng(imgData, "encodedImg");

      const inputSecret = JSON.stringify(curChartSamp);
      // console.log(`inputSecret = ${inputSecret}`);
      encodeImg(imgData, inputSecret)
        .then((result) => {
          if (result) {
            setEncodedImg(result);
          } else {
            throw new Error('Failed to encode the secret!');
          }
          setStopUploadImg(false);
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('Failed to encode the secret!');
          setEncodedImg(undefined);
          setStopUploadImg(false);
        });
    }).catch(() => {
      throw (new Error('Failed to get chart image URL'));
    });
  };

  const chartSelectMenu = (
    <Menu mode="horizontal" defaultSelectedKeys={[`chartID_${CHART_SAMPLES[0].name}_${CHART_SAMPLES[0].charts[0].id}`]}>
      <SubMenu key="ChartSamplesMenu" icon={<DownOutlined />} title="Chart Samples">
        {
          CHART_SAMPLES.map((chartCateg) => (
            <Menu.ItemGroup title={chartCateg.name} key={`chartCateg_${chartCateg.name}`}>
              {chartCateg.charts.map((chart) => (
                <Menu.Item
                  key={`chartID_${chartCateg.name}_${chart.id}`}
                  onClick={() => {
                    setCurChartSamp(chart);
                  }}
                >
                  <p >{`${chart.type}-${chart.id}`}</p>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          ))
        }
      </SubMenu>
    </Menu >

  );
  return (

    <Card hoverable className={'uploadImgPanel'} title="Encoder">
      <Spin spinning={stopUploadImg}>
        {/* <UploadImgModal key="Encode" reload={reloadUpImgPanel} setUploadImg={getUploadImg}></UploadImgModal> */}

        <div
        >
          {chartSelectMenu}
        </div>

        <div
          style={{
            marginTop: '25px',
          }}
        >
          <ChartView curChartSamp={curChartSamp} getChartObj={getChartObj} />
        </div>

        <div className={'buttonBox'}>
          <Button
            key={'Encode'}
            size="large"
            type="primary"
            style={{
              marginTop: '15px',
            }}
            block
            onClick={() => handleEncodeBtn()}
          >
            Encode
          </Button>
        </div>
      </Spin>
    </Card>



  );
};

export default VisCard;
