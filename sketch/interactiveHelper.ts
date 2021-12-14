let
  horizontalLinesSlider: p5.Element,
  verticalLinesSlider: p5.Element,
  lineThicknessSlider: p5.Element,
  backgroundColorPicker: p5.Element,
  evenLinesColorPicker: p5.Element,
  oddLinesColorPicker: p5.Element,
  hSliderValue: number,
  hSliderP: p5.Element,
  vSliderValue: number,
  vSliderP: p5.Element,
  lineThicknessValue: number,
  lineThicknessP: p5.Element,
  currentXValue: number,
  currentYValue: number;


function initInteractiveElements(): void {
  horizontalLinesSlider = createSlider(1, 51, 6).size(400).parent('sliders');
  hSliderP = createP(horizontalLinesSlider.value().toString()).parent('sliders');
  
  verticalLinesSlider = createSlider(1, 51, 6).size(400).parent('sliders');
  vSliderP = createP(verticalLinesSlider.value().toString()).parent('sliders');

  lineThicknessSlider = createSlider(1, 20, 6).size(400).parent('sliders');
  lineThicknessP = createP(lineThicknessSlider.value().toString()).parent('sliders');


  backgroundColorPicker = createColorPicker('#c9262c').class('bgColorPicker').parent('bgPicker');
  createP('cor do fundo').parent('bgPicker').class('pickerText');

  evenLinesColorPicker = createColorPicker('#000000').class('evenLinesColorPicker').parent('evenPicker');
  createP('cor das linhas em colunas ímpares').parent('evenPicker').class('pickerText')

  oddLinesColorPicker = createColorPicker('#FFFFFF').class('oddLinesColorPicker').parent('oddPicker');
  createP('cor das linhas em colunas pares').parent('oddPicker').class('pickerText')

}