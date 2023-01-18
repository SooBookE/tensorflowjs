console.log("ㅎㅇ"); // script 연결 확인용

async function getData() {
  const carsDataResponse = await fetch(
    "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
  );
  const carsData = await carsDataResponse.json();
  const cleaned = carsData
    .map((car) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car) => car.mpg != null && car.horsepower != null);
  return cleaned;
}

async function run() {
  const data = await getData();
  const values = data.map((d) => ({ x: d.horsepower, y: d.mpg }));

  tfvis.render.scatterplot(
    { name: "Horsepower v MPG" },
    { values },
    { xLabel: "Horsepower", yLabel: "MPG", height: 300 }
  );
  const model = createModel();
  tfvis.show.modelSummary({ name: "Model Summary" }, model);

  const tensorData = convertToTensor(data);
  const { inputs, labels } = tensorData;

  await trainModel(model, inputs, labels);
  console.log("Done Training");

  testModel(model, data, tensorData);
}

function createModel() {
  const model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

  //   model.add(tf.layers.dense({ units: 1, useBias: true }));
  /* 선형적 출력 */
  model.add(
    tf.layers.dense({ units: 1, activation: "sigmoid", useBias: true })
  );
  /* 예제로 해 본 sigmoid로 곡선으로 출력. 맞는지는 모르겠다. */
  return model;
}

function convertToTensor(data) {
  return tf.tidy(() => {
    tf.util.shuffle(data);
    /* 데이터를 셔플해준다. */
    const inputs = data.map((d) => d.horsepower);
    const labels = data.map((d) => d.mpg);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));
    // normalized는 정규화 한다는 뜻.( relu 함수 쓰듯이 필터링 한다는 뜻. )
    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    };
    // 정해준 범위를 리턴.
  });
}

async function trainModel(model, inputs, labels) {
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"],
  });
  // 다양한 옵티마이저가 있지만, 손 쉬운 adam()을 많이 사용하며,
  // loss(오차)값을 통해 학습이 얼마나 잘 진행되고 있는지 확인할 수 있다.

  const batchSize = 32;
  const epochs = 500;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "Training Performance" },
      ["loss", "mse"],
      { height: 200, callbacks: ["onEpochEnd"] }
    ),
  });
}

function testModel(model, inputData, normalizationData) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));

    const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);

    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });

  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val, y: preds[i] };
  });

  const originalPoints = inputData.map((d) => ({ x: d.horsepower, y: d.mpg }));

  tfvis.render.scatterplot(
    { name: "Model Predictions vs Original Data" },
    {
      values: [originalPoints, predictedPoints],
      series: ["original", "predicted"],
    },
    { xLabel: "Horsepower", yLabel: "MPG", height: 300 }
  );
}

document.addEventListener("DOMContentLoaded", run);
