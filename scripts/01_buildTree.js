// mergeYaml.js
import fs from 'node:fs'; // Импорт синхронных методов файловой системы (ESM) :contentReference[oaicite:1]{index=1}
import path from 'node:path'; // Модуль 'path' для работы с путями (ESM) :contentReference[oaicite:2]{index=2}
import YAML from 'yaml'; // Библиотека 'yaml' для парсинга/сериализации YAML :contentReference[oaicite:3]{index=3}

// Корневая директория: передаётся как аргумент CLI или берётся текущая папка
const rootDir = process.argv[2] || process.cwd();

/**
 * Рекурсивно обходит папку и собирает дерево из index.yaml.
 * В поле children создаётся объект, где ключ — имя подпапки, а значение — её узел.
 * @param {string} dir — путь к текущей директории
 * @returns {object} — JS-объект, полученный из YAML + поле children (если есть)
 */
function traverse(dir) {
	const idxPath = path.join(dir, 'index.yaml');
	let node = {};

	// Если index.yaml существует, читаем и парсим его
	if (fs.existsSync(idxPath)) {
		const content = fs.readFileSync(idxPath, 'utf8'); // Синхронное чтение файла :contentReference[oaicite:4]{index=4}
		try {
			node = YAML.parse(content); // Преобразуем YAML в JS-объект :contentReference[oaicite:5]{index=5}
		} catch (err) {
			console.error(`Ошибка при парсинге YAML в файле ${idxPath}:`, err);
			process.exit(1);
		}
	}

	// Список всех элементов в директории, фильтруем только папки
	const entries = fs.readdirSync(dir); // Читаем содержимое папки (синхронно) :contentReference[oaicite:6]{index=6}
	const childrenDirs = entries
		.map((name) => path.join(dir, name))
		.filter((p) => fs.statSync(p).isDirectory()); // Определяем, что это папка :contentReference[oaicite:7]{index=7}

	// Для каждой подпапки рекурсивно собираем её узел
	const children = {};
	for (const subDir of childrenDirs) {
		const childNode = traverse(subDir);
		if (Object.keys(childNode).length > 0) {
			const folderName = path.basename(subDir); // Имя папки без пути :contentReference[oaicite:8]{index=8}
			children[folderName] = childNode;
		}
	}

	// Если найден хотя бы один потомок, добавляем поле children
	if (Object.keys(children).length > 0) {
		node.children = children;
	}

	return node;
}

// Запускаем обход от корня и сериализуем результат в YAML
const tree = traverse(path.resolve(rootDir)); // Преобразуем относительный путь в абсолютный :contentReference[oaicite:9]{index=9}
process.stdout.write(YAML.stringify(tree)); // Записываем результат в stdout для перенаправления в файл :contentReference[oaicite:10]{index=10}
