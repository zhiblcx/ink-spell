import * as iconv from 'iconv-lite';
import * as jschardet from 'jschardet';
import * as fs from 'node:fs';
import * as readline from 'node:readline';

export function detectFileEncoding(filePath) {
  const buffer = fs.readFileSync(filePath);
  const result = jschardet.detect(buffer);
  return result.encoding;
}

export function readFileContent(path, detectedEncoding) {
  const filePath = process.cwd() + path;
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream.pipe(iconv.decodeStream(detectedEncoding)),
    crlfDelay: Infinity,
  });
  const chapterPattern =
    /^(.{0,5}第\s*[一二三四五六七八九十零\d]+\s*章|[\d]+[.|、]\s*第\s*[一二三四五六七八九十零\d]+\s*章)\s*(.{0,10})$/;

  const chapter = ['简介'];
  const content = [[]];
  let currentChapterIndex = 0; // 当前章节的下标

  return new Promise((resolve) => {
    rl.on('line', (line) => {
      const chapterMatch = line.match(chapterPattern);
      if (chapterMatch) {
        const chapterTitle = chapterMatch[0];
        chapter.push(chapterTitle);
        content.push([]); // 创建一个空数组用于存储该章节的内容
        currentChapterIndex++; // 更新当前章节的下标
      } else if (currentChapterIndex > 0) {
        content[currentChapterIndex].push(line); // 将行内容存储到对应章节的内容数组中
      } else if (currentChapterIndex == 0) {
        content[currentChapterIndex].push(line);
      }
    });

    rl.on('close', () => {
      resolve({
        chapter,
        content,
      });
    });
  });
}
