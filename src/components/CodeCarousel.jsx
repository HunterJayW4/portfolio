// components/CodeCarousel.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const snippets = [
  {
    title: 'Draw Menu UI',
    filename: 'menu.c',
    code: `void drawMenu() {
  ili9341_fill_screen(ili9341_display, ILI9341_BLACK);
  ili9341_draw_string(ili9341_display, menu, "PONG!");
  ili9341_draw_string(ili9341_display, play, "play");
  ili9341_draw_string(ili9341_display, settings, "settings");
  ili9341_draw_string(ili9341_display, help, "help");
  ili9341_fill_rect(ili9341_display, ILI9341_RED, menuItems[0].origin_x, menuItems[0].origin_y + 22, 40, 5);
}`
  },
  {
    title: 'Update Arena',
    filename: 'arena.c',
    code: `void updateArena() {
  ili9341_fill_rect(ili9341_display, ILI9341_RED, 0, 0, 4, 240);
  ili9341_fill_rect(ili9341_display, ILI9341_GREEN, 316, 0, 4, 240);
  for (int16_t yLine = 0; yLine < 240; yLine += 10) {
    ili9341_fill_rect(ili9341_display, ILI9341_WHITE, 159, yLine, 2, 5);
  }
  ili9341_draw_char(ili9341_display, botScore, '0' + botScoreNum);
  ili9341_draw_char(ili9341_display, playerScore, '0' + playerScoreNum);
}`
  },
  {
    title: 'Ball Physics + Scoring',
    filename: 'ball.c',
    code: `void updateBallPosition() {
  ili9341_fill_circle(ili9341_display, ILI9341_BLACK, ballX, ballY, 4);
  ballX += velocityX;
  ballY += velocityY;
  if (ballX <= 0 || ballX >= 320) {
    velocityX *= -1;
    if (ballX >= 320) playerScoreNum++;
    if (ballX <= 0) botScoreNum++;
  }
  if (ballY <= 0 || ballY >= 240) velocityY *= -1;
  ili9341_fill_circle(ili9341_display, ILI9341_WHITE, ballX, ballY, 4);
}`
  },
  {
    title: 'Bot Paddle AI',
    filename: 'bot.c',
    code: `void calculateOtherRectangle() {
  ili9341_fill_rect(ili9341_display, ILI9341_BLACK, botX, botY + 1, width, botSpeed);
  botY += direction;
  if (botY <= 0 || botY + height >= 240) direction *= -1;
  ili9341_fill_rect(ili9341_display, color, botX, botY, width, height);
}`
  },
  {
    title: 'Player Paddle via Potentiometer',
    filename: 'player.c',
    code: `void calculateRectangle() {
  readADC2();
  int8_t direction = 0;
  if (potentiometer_value < 1650) direction = 1;
  else if (potentiometer_value > 1750) direction = -1;
  new_y = playerY + direction * 2;
  if (new_y < 0) new_y = 0;
  else if (new_y + height > 240) new_y = 240 - height;
  ili9341_fill_rect(ili9341_display, ILI9341_BLACK, playerX, playerY, width, height);
  ili9341_fill_rect(ili9341_display, color, playerX, new_y, width, height);
  playerY = new_y;
}`
  },
  {
    title: 'Settings Display Text',
    filename: 'settings.c',
    code: `char gameSpeedText[] = "TMP";
if (playerMode == 1) {
  strcpy(gameSpeedText, "Mode: Singleplayer");
} else {
  strcpy(gameSpeedText, "Mode: 2-Player");
}
ili9341_draw_string(ili9341_display, gameSpeedHeader, gameSpeedText);`
  },
  {
    title: 'Main Game Loop',
    filename: 'main.c',
    code: `while (1) {
  playGame();
}`
  }
]

export default function CodeCarousel() {
    const [index, setIndex] = useState(0)
    const next = () => setIndex((index + 1) % snippets.length)
    const prev = () => setIndex((index - 1 + snippets.length) % snippets.length)
  
    useEffect(() => {
      const interval = setInterval(next, 5000)
      return () => clearInterval(interval)
    }, [index])
  
    return (
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Code from the Core</h2>
          <p className="text-slate-400">Explore real C code from my STM32 Pong game — rendered directly from embedded hardware logic.</p>
        </div>
  
        <div className="relative max-w-7xl mx-auto min-h-[440px] overflow-hidden rounded-xl border border-slate-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-800">
                <div className="flex items-center px-4 py-2 bg-slate-700">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-4"></span>
                  <span className="text-sm">{snippets[index].filename}</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-slate-400 mb-1">[{index + 1} / {snippets.length}]</div>
                  <h3 className="text-base font-semibold mb-2">{snippets[index].title}</h3>
                  <div className="max-h-[320px] overflow-auto">
                    <SyntaxHighlighter language="c" style={materialDark} customStyle={{ fontSize: '0.85rem', borderRadius: '0.5rem' }}>
                      {snippets[index].code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
  
          {/* Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button onClick={prev} className="bg-slate-800 hover:bg-slate-700 p-2 rounded-r">
              ←
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button onClick={next} className="bg-slate-800 hover:bg-slate-700 p-2 rounded-l">
              →
            </button>
          </div>
        </div>
  
        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {snippets.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-teal-400' : 'bg-slate-500'}`}
            ></button>
          ))}
        </div>
  
        {/* GitHub Link */}
        <div className="mt-6 text-center">
          <a
            href="https://github.com/HunterJayW4/ECE433Final"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-teal-400 hover:underline text-sm"
          >
            View the full STM32 Pong project on GitHub →
          </a>
        </div>
      </section>
    )
  }
  