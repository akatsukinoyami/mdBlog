Из-за ограничения MacOS, под нужды GPU выделяется не более чем 75% объединенной памяти, так что для исправления есть небольшая команда для терминала:

```sh
sudo sysctl iogpu.wired_limit_mb=<INT_OF_MEGABYTES>
```

## Генерация текста

Сам же бенчмарк от Kobold.cpp запускал командой:

```sh
model=<PATH_TO_GGUF_MODEL>
python3 koboldcpp.py --model $model --gpulayers 999 --nommap --benchmark
```

Так же я добавил в сравнение стационарный ПК с конфигурацией:

AMD Ryzen 5 5600 / 32Gb DDR4 3600Mhz / Nvidia RTX 3090

На ПК нейросети размера 8х7B запускались в 23 слоях на GPU, а остальные слои на CPU.

:::4

  <p>Модель</p>
  <p>MacBook Pro 2021</p>
  <p>MacBook Pro 2023</p>
  <p>ПК</p>

  <p class="mb-3">
    mistral-instruct-v0.2<br/>
    Параметров: 7B<br/>
    Квантование: Q8_0<br/>
    Размер: 7,7Гб
  </p>
  <p>
    Pcs: 7.74s|04.0ms/T|251.81T/s<br/>
    Pen: 5.63s|56.3ms/T|17.75T/s<br/>
    Ttl: 13.37s 7.48T/s
  </p>
  <p>
    Pcs: 6.08s|3.1ms/T|320.39T/s<br/>
    Pen: 7.03s|70.3ms/T|14.22T/s<br/>
    Ttl: 13.11s (7.63T/s)
  </p>
  <p>
    Pcs: 0.48s|0.2ms/T|4058.33T/s<br/>
    Pen: 1.69s|16.9ms/T|59.35T/s<br/>
    Ttl: 2.17s (46.19T/s)
  </p>

  <p class="mb-3">
    Kaiju<br/>
    Параметров: 11B<br/>
    Квантование: Q6_K<br/>
    Размер: 8,81Гб
  </p>
  <p>
    Pcs: 13.95s|7.2ms/T|139.69T/s<br/>
    Pen: 8.52s|85.2ms/T|11.74T/s<br/>
    Ttl: 22.46s (4.45T/s)
  </p>
  <p>
    Pcs: 10.50s|5.4ms/T|185.59T/s<br/>
    Pen: 8.00s|80.0ms/T|12.49T/s<br/>
    Ttl: 18.50s (5.41T/s)
  </p>
  <p>
    Pcs: 0.84s|0.4ms/T|2305.33T/s<br/>
    Pen: 2.15s|21.5ms/T|46.47T/s<br/>
    Ttl: 3.00s (33.37T/s)
  </p>

  <p class="mb-3">
    emerhyst<br/>
    Параметров: 20B<br/>
    Квантование: Q5_K_S<br/>
    Размер: 13,77Гб
  </p>
  <p>
    Не может быть запущена из-за размера
  </p>
  <p>
    Pcs: 20.11s|10.3ms/T|96.85T/s<br/>
    Pen: 13.68s|136.8ms/T|7.31T/s<br/>
    Ttl: 33.79s (2.96T/s)
  </p>
  <p>
    Pcs: 1.33s|0.7ms/T|1465.76T/s<br/>
    Pen: 3.19s|31.9ms/T|31.33T/s<br/>
    Ttl: 4.52s (22.12T/s)
  </p>

  <p class="mb-3">
    StarDust_v0.2<br/>
    Параметров: 20B<br/>
    Квантование: Q5_K_M<br/>
    Размер: 14,66Гб
  </p>
  <p>
    Не может быть запущена из-за размера
  </p>
  <p>
    Pcs: 18.26s|9.4ms/T|106.66T/s<br/>
    Pen: 12.31s|123.2ms/T|8.12T/s<br/>
    Ttl: 30.58s (3.27T/s)
  </p>
  <p>
    Pcs: 1.33s|0.7ms/T|1465.76T/s<br/>
    Pen: 3.19s|31.9ms/T|31.33T/s<br/>
    Ttl: 4.52s (22.12T/s)
  </p>

  <p class="mb-3">
    BagelWorldTour<br/>
    Параметров: 8x7B<br/>
    Квантование: Q5_K_S<br/>
    Размер: 32,23Гб
  </p>
  <p>
    Не может быть запущена из-за размера
  </p>
  <p>
    Pcs: 22.06s|11.3ms/T|88.30T/s<br/>
    Pen: 8.37s|83.7ms/T|11.95T/s<br/>
    Ttl: 30.43s (3.29T/s)
  </p>
  <p>
    Pcs: 10.09s|5.2ms/T|193.01T/s<br/>
    Pen: 10.61s|106.1ms/T|9.42T/s<br/>
    Ttl: 20.71s (4.83T/s)
  </p>

  <p class="mb-3">
    Noromaid-v0.4-Mixtral-Instruct<br/>
    Параметров: 8x7B<br/>
    Квантование: Q5_K_S<br/>
    Размер: 32,65Гб
  </p>
  <p>
    Не может быть запущена из-за размера
  </p>
  <p>
    Pcs: 21.98s|11.3ms/T|88.62T/s<br/>
    Pen: 8.68s|86.8ms/T|11.52T/s<br/>
    Ttl: 30.66s (3.26T/s)
  </p>
  <p>
    Pcs: 10.09s|5.2ms/T|193.01T/s<br/>
    Pen: 10.61s|106.1ms/T|9.42T/s<br/>
    Ttl: 20.71s (4.83T/s)
  </p>

:::