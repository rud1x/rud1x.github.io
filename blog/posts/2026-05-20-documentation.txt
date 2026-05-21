---
title: "📚 Документация блога"
excerpt: "Как оформлять статьи: фото, кнопки, карточки, галереи"
category: tutorial
date: 2025-05-20
---

Быстрый справочник по оформлению статей, чтобы я мог сюда заглянуть)

---

## 📷 ФОТОГРАФИИ

### Обычное фото

**Как писать:**
```markdown
![Мой проект](https://avatars.githubusercontent.com/u/127332134?v=4)
```

**Как выглядит:**
![Мой проект](https://avatars.githubusercontent.com/u/127332134?v=4)

---

### Размеры фото

**Как писать:**
```html
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-small" alt="Маленькое (30%)">
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium" alt="Среднее (50%)">
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-large" alt="Большое (80%)">
```

**Как выглядит:**

<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-small" alt="Маленькое">

<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium" alt="Среднее">

<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-large" alt="Большое">

---

### Выравнивание фото

**Как писать:**
```html
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium img-center" alt="По центру">
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium img-left" alt="Слева">
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium img-right" alt="Справа">
```

**Как выглядит:**

**По центру:**
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium img-center" alt="По центру">

**Слева:**
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium img-left" alt="Слева">

**Справа:**
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-medium img-right" alt="Справа">

---

### Обтекание текстом

**Как писать:**
```html
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-float-left" style="width:150px;" alt="Слева">
Текст обтекает фото слева. Можно написать несколько предложений, чтобы увидеть эффект обтекания. Фото будет слева, а текст справа от него.

<div class="clearfix"></div>
```

**Как выглядит:**

<img src="https://avatars.githubusercontent.com/u/127332134?v=4" class="img-float-left" style="width:150px;" alt="Слева">
Текст обтекает фото слева. Можно написать несколько предложений, чтобы увидеть эффект обтекания. Фото будет слева, а текст справа от него.

<div class="clearfix"></div>

---

### Кастомный размер

**Как писать:**
```html
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" style="width: 100px;" alt="100px">
<img src="https://avatars.githubusercontent.com/u/127332134?v=4" style="width: 80px; border-radius: 50%;" alt="Круглое 80px">
```

**Как выглядит:**

<img src="https://avatars.githubusercontent.com/u/127332134?v=4" style="width: 100px;" alt="100px">

<img src="https://avatars.githubusercontent.com/u/127332134?v=4" style="width: 80px; border-radius: 50%;" alt="Круглое 80px">

---

## 🖼️ ГАЛЕРЕИ

### Сетка 2 колонки

**Как писать:**
```html
<div class="two-columns">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Аватар 1">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Аватар 2">
</div>
```

**Как выглядит:**

<div class="two-columns">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Аватар 1">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Аватар 2">
</div>

---

### Галерея (адаптивная сетка)

**Как писать:**
```html
<div class="gallery">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Фото 1">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Фото 2">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Фото 3">
</div>
```

**Как выглядит:**

<div class="gallery">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Фото 1">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Фото 2">
  <img src="https://avatars.githubusercontent.com/u/127332134?v=4" alt="Фото 3">
</div>

---

## 🃏 КАРТОЧКИ

### Карточка с кнопкой

**Как писать:**
```html
<div class="card">
  <div class="card-title">🤖 HuroBot</div>
  <div class="card-text">OSINT инструмент для Telegram. Позволяет собирать информацию о пользователях.</div>
  <a href="https://github.com/rud1x/HuroBot_tg" class="btn" target="_blank">GitHub →</a>
</div>
```

**Как выглядит:**

<div class="card">
  <div class="card-title">🤖 HuroBot</div>
  <div class="card-text">OSINT инструмент для Telegram. Позволяет собирать информацию о пользователях.</div>
  <a href="https://github.com/rud1x/HuroBot_tg" class="btn" target="_blank">GitHub →</a>
</div>

---

### Сетка карточек 2 колонки

**Как писать:**
```html
<div class="grid-2">
  <div class="card">
    <div class="card-title">🚀 NeoShell</div>
    <div class="card-text">Управляй ПК с телефона через Wi-Fi</div>
    <a href="#" class="btn btn-outline">Подробнее</a>
  </div>
  <div class="card">
    <div class="card-title">💻 GitWid</div>
    <div class="card-text">Виджеты GitHub статистики для Rainmeter</div>
    <a href="#" class="btn btn-outline">Подробнее</a>
  </div>
</div>
```

**Как выглядит:**

<div class="grid-2">
  <div class="card">
    <div class="card-title">🚀 NeoShell</div>
    <div class="card-text">Управляй ПК с телефона через Wi-Fi</div>
    <a href="#" class="btn btn-outline">Подробнее</a>
  </div>
  <div class="card">
    <div class="card-title">💻 GitWid</div>
    <div class="card-text">Виджеты GitHub статистики</div>
    <a href="#" class="btn btn-outline">Подробнее</a>
  </div>
</div>

---

## 🔘 КНОПКИ

### Обычная кнопка

**Как писать:**
```html
<a href="https://t.me/therudix" class="btn" target="_blank">Telegram</a>
```

**Как выглядит:**

<a href="https://t.me/therudix" class="btn" target="_blank">Telegram</a>

---

### Кнопка с иконкой

**Как писать:**
```html
<a href="https://t.me/therudix" class="btn" target="_blank">
  <i class="ph-fill ph-telegram-logo"></i> Telegram
</a>
```

**Как выглядит:**

<a href="https://t.me/therudix" class="btn" target="_blank">
  <i class="ph-fill ph-telegram-logo"></i> Telegram
</a>

---

### Кнопка-контур

**Как писать:**
```html
<a href="https://github.com/rud1x" class="btn btn-outline" target="_blank">GitHub</a>
```

**Как выглядит:**

<a href="https://github.com/rud1x" class="btn btn-outline" target="_blank">GitHub</a>

---

### Группа кнопок

**Как писать:**
```html
<div class="button-group">
  <a href="https://t.me/therudix" class="btn" target="_blank">Telegram</a>
  <a href="https://github.com/rud1x" class="btn btn-outline" target="_blank">GitHub</a>
  <a href="#" class="btn btn-outline">Портфолио</a>
</div>
```

**Как выглядит:**

<div class="button-group">
  <a href="https://t.me/therudix" class="btn" target="_blank">Telegram</a>
  <a href="https://github.com/rud1x" class="btn btn-outline" target="_blank">GitHub</a>
  <a href="#" class="btn btn-outline">Портфолио</a>
</div>

---

## 📝 ПРИМЕЧАНИЯ

### Заметка (синяя)

**Как писать:**
```html
<div class="note">
📌 **Примечание:** Это обычная заметка для важной информации.
</div>
```

**Как выглядит:**

<div class="note">
📌 **Примечание:** Это обычная заметка для важной информации.
</div>

---

### Предупреждение (оранжевое)

**Как писать:**
```html
<div class="warning">
⚠️ **Внимание:** Будьте осторожны при использовании этого инструмента.
</div>
```

**Как выглядит:**

<div class="warning">
⚠️ **Внимание:** Будьте осторожны при использовании этого инструмента.
</div>

---

### Успех (зелёное)

**Как писать:**
```html
<div class="success">
✅ **Готово:** Ваш бот успешно запущен!
</div>
```

**Как выглядит:**

<div class="success">
✅ **Готово:** Ваш бот успешно запущен!
</div>

---

### Ошибка (красное)

**Как писать:**
```html
<div class="error">
❌ **Ошибка:** Не удалось подключиться к серверу.
</div>
```

**Как выглядит:**

<div class="error">
❌ **Ошибка:** Не удалось подключиться к серверу.
</div>

---

## 🎵 АККОРДЕОН (СПОЙЛЕР)

**Как писать:**
```html
<details>
<summary>📖 Нажми, чтобы раскрыть ответ</summary>

Вот скрытый контент, который появляется при нажатии. Сюда можно вставить текст, код или даже картинки!

```python
print("Hello from inside!")
```

</details>
```

**Как выглядит:**

<details>
<summary>📖 Нажми, чтобы раскрыть ответ</summary>

Вот скрытый контент, который появляется при нажатии. Сюда можно вставить текст, код или даже картинки!

```python
print("Hello from inside!")
```

</details>

---

## 💬 ВСПЛЫВАЮЩАЯ ПОДСКАЗКА

**Как писать:**
```html
Наведи курсор на <span data-tooltip="Это секретная информация!">этот текст</span> чтобы увидеть подсказку.
```

**Как выглядит:**

Наведи курсор на <span data-tooltip="Это секретная информация!">этот текст</span> чтобы увидеть подсказку.

---

## 🎬 ВИДЕО (YouTube)

**Как писать:**
```html
<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
```

**Как выглядит:**

<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>

---

## 📊 ТАБЛИЦЫ

**Как писать:**
```markdown
| Проект | Описание | Статус |
|--------|----------|--------|
| HuroBot | OSINT инструмент | ✅ Активен |
| NeoShell | Управление ПК | 🚧 В разработке |
| GitWid | GitHub виджеты | ✅ Готов |
```

**Как выглядит:**

| Проект | Описание | Статус |
|--------|----------|--------|
| HuroBot | OSINT инструмент | ✅ Активен |
| NeoShell | Управление ПК | 🚧 В разработке |
| GitWid | GitHub виджеты | ✅ Готов |

---

## 🏷️ ТЕГИ / BADGE

**Как писать:**
```html
<span class="badge">Python</span>
<span class="badge">Telegram Bot</span>
<span class="badge">Open Source</span>
```

**Как выглядит:**

<span class="badge">Python</span>
<span class="badge">Telegram Bot</span>
<span class="badge">Open Source</span>

---

## 📐 ПРОГРЕСС-БАР

**Как писать:**
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 75%;"></div>
</div>
<p style="text-align: center;">Готовность проекта: 75%</p>
```

**Как выглядит:**

<div class="progress-bar">
  <div class="progress-fill" style="width: 75%;"></div>
</div>
<p style="text-align: center;">Готовность проекта: 75%</p>

---

## ✨ БЫСТРЫЙ СПРАВОЧНИК

| Элемент | Код |
|---------|-----|
| Фото | `<img src="url" class="img-medium">` |
| Кнопка | `<a href="url" class="btn">Текст</a>` |
| Карточка | `<div class="card">...</div>` |
| Галерея | `<div class="gallery">...</div>` |
| Заметка | `<div class="note">...</div>` |
| Аккордеон | `<details><summary>...</summary>...</details>` |
| Подсказка | `<span data-tooltip="текст">...</span>` |
