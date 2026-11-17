// Skills Aadvik can stand behind. `used` lists project ids (see lib/projects.js, plus 'echosafe')
// and/or roles where the skill was used, so the explorer can show real evidence.
// Do NOT add Docker, Linux, TCL, Perl, Verilog or Assembly.

export const skillGroups = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', used: ['echosafe', 'microvibe', 'foolingai', 'bias', 'asl', 'sentiment', 'digit'] },
      { name: 'Java', used: [] },
      { name: 'C', used: ['echosafe', 'tinytemp', 'digit'] },
      { name: 'C++', used: ['echosafe', 'microvibe', 'heart', 'role:mech'] },
      { name: 'JavaScript', used: ['medway'] },
      { name: 'MATLAB', used: [] },
      { name: 'SQL', used: [] },
      { name: 'Bash', used: [] },
    ],
  },
  {
    name: 'Hardware & PCB',
    skills: [
      { name: 'KiCad', used: ['echosafe', 'tinytemp'] },
      { name: 'Schematic capture', used: ['echosafe', 'tinytemp'] },
      { name: 'PCB layout', used: ['echosafe', 'tinytemp'] },
      { name: 'BOM & part selection', used: ['echosafe'] },
      { name: 'Board bring-up', used: ['echosafe', 'role:mech', 'role:marieb'] },
      { name: 'Oscilloscope & logic analyzer', used: ['role:mech'] },
    ],
  },
  {
    name: 'Embedded & firmware',
    skills: [
      { name: 'ESP32-S3', used: ['echosafe', 'microvibe'] },
      { name: 'ATtiny85', used: ['tinytemp'] },
      { name: 'ARM Cortex-A9', used: ['digit'] },
      { name: 'DE1-SoC FPGA', used: ['digit'] },
      { name: 'Arduino', used: ['microvibe', 'heart'] },
      { name: 'I2C', used: ['echosafe', 'heart', 'role:mech'] },
      { name: 'SPI', used: ['role:mech'] },
      { name: 'UART', used: ['role:mech'] },
      { name: 'I2S', used: ['echosafe'] },
      { name: 'PWM', used: ['microvibe'] },
      { name: 'ADC', used: ['microvibe', 'tinytemp'] },
    ],
  },
  {
    name: 'VLSI & EDA',
    skills: [
      { name: 'Cadence Innovus', used: ['noc'] },
      { name: 'Cadence Virtuoso', used: [] },
      { name: 'Cadence Pegasus', used: [] },
      { name: 'Synopsys Design Compiler', used: ['noc'] },
      { name: 'Synopsys HSPICE', used: [] },
      { name: 'Synthesis & P&R', used: ['noc'] },
      { name: 'DRC / LVS', used: [] },
      { name: 'Static timing analysis', used: [] },
    ],
  },
  {
    name: 'ML & data',
    skills: [
      { name: 'TensorFlow / Keras', used: ['echosafe', 'sentiment'] },
      { name: 'scikit-learn', used: ['foolingai', 'echosafe'] },
      { name: 'Audio features (MFCC)', used: ['echosafe'] },
      { name: 'OpenCV', used: ['asl', 'sentiment'] },
      { name: 'MediaPipe', used: ['asl'] },
      { name: 'OpenAI API', used: ['bias'] },
      { name: 'Pandas', used: ['foodscout'] },
    ],
  },
  {
    name: 'Software & tools',
    skills: [
      { name: 'Git', used: [] },
      { name: 'React', used: ['medway'] },
      { name: 'Firebase', used: ['medway'] },
      { name: 'Django', used: ['uplay'] },
      { name: 'Streamlit', used: ['asl', 'sentiment', 'foodscout'] },
      { name: 'Quartus Prime', used: [] },
      { name: 'ModelSim', used: [] },
      { name: 'JIRA', used: [] },
    ],
  },
]

export const ROLE_LABELS = {
  'role:mech': 'UMass Mechatronics Team',
  'role:marieb': 'Elaine Marieb Center research',
  'role:wealthtech': 'WealthTechAI internship',
}
