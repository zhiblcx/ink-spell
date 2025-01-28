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

  // 优化后的章节匹配规则
  const chapterPattern = /^((.{0,7}第\s*([一二三四五六七八九十零\d]){1,3}\s*章|[\d]+[.|、]\s*第\s*([一二三四五六七八九十零\d]){1,3}\s*章)\s*(.{0,10}))|章节目录+\s*(.{0,10})|(🔒\d(.{0,10}))$/;

  const chapter = ['简介'];
  const content = [[]];
  let currentChapterIndex = 0;
  let lineCount = 0;

  return new Promise((resolve) => {
    rl.on('line', (line) => {
      lineCount++;
      // 章节匹配，如果找到新章节，创建新章节
      const chapterMatch = line.match(chapterPattern);
      if (chapterMatch) {
        chapter.push(line);
        content.push([]); // 创建新的章节内容
        currentChapterIndex++;
        lineCount = 0;
      } else if (currentChapterIndex >= 0) {
        // 当前章节内容，超过50行时会强制换章节
        if (lineCount >= 310) {
          const chapterTitle = `第${chapter.length}章(*)`;
          chapter.push(chapterTitle);
          content.push([]);
          currentChapterIndex++;
          lineCount = 0;
        }
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
