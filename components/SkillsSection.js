// components/SkillsSection.js
export default function SkillsSection() {
  const categories = {
    Languages: ["Python", "C", "C++", "Java", "JavaScript", "Verilog", "HTML", "SQL", "Bash", "MATLAB", "Assembly"],
    Frameworks: ["Node.js", "Django", "Flask", "Streamlit", "Tkinter"],
    Tools: ["Docker", "Git", "Postman", "VS Code", "Quartus Prime", "ModelSim", "KiCad", "Frappe"],
    AI_ML: ["OpenAI API", "TF-IDF", "KNN", "SVM", "NLP", "Neural Nets", "MediaPipe", "Prompt Engineering"],
    Embedded: ["ATtiny85", "ARM Cortex-A9", "Raspberry Pi Pico", "Arduino", "DE1-SoC", "BeagleBone"],
    Protocols: ["I2C", "SPI", "UART", "USB", "GPIO", "ADC", "TCP/IP", "DNS", "Wireshark"],
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-black text-white relative z-10 font-bodoni">
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-3 animate-on-scroll">Tech Stack</h2>
      <div className="h-px w-12 bg-white/30 mx-auto mb-10 animate-on-scroll" />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-white mb-3">{category}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item} className="bg-gray-800 text-sm px-3 py-1 rounded-md">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}