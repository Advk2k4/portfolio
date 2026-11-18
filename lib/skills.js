// Skills Aadvik can stand behind. `used` lists project ids (see lib/projects.js, plus 'echosafe')
// and/or roles where the skill was used, so the explorer can show real evidence.
// Do NOT add Docker, Linux, TCL, Perl, Verilog or Assembly.

export const skillGroups = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', used: ['echosafe', 'microvibe', 'foolingai', 'bias', 'asl', 'sentiment', 'clearn', 'role:matchingdonors', 'role:wealthtech', 'role:marieb'] },
      { name: 'Java', used: ['safestride'] },
      { name: 'C', used: ['echosafe', 'tinytemp', 'digit'] },
      { name: 'C++', used: ['echosafe', 'microvibe', 'heart', 'role:mech'] },
      { name: 'JavaScript', used: ['medway', 'farewise'] },
      { name: 'TypeScript', used: ['farewise'] },
      { name: 'MATLAB', used: ['role:mech'] },
      { name: 'SQL', used: ['role:wealthtech'] },
      { name: 'Bash', used: ['clearn'] },
    ],
  },
  {
    name: 'Hardware & PCB',
    skills: [
      { name: 'KiCad', used: ['echosafe', 'tinytemp'] },
      { name: 'Schematic capture', used: ['echosafe', 'tinytemp'] },
      { name: 'PCB layout', used: ['echosafe', 'tinytemp'] },
      { name: 'BOM & part selection', used: ['echosafe'] },
      { name: 'Board bring-up', used: ['echosafe', 'role:mech'] },
      { name: 'Oscilloscope, logic analyzer, DMM', used: ['role:mech', 'tinytemp'] },
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
      { name: 'PID control', used: ['role:mech'] },
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
      { name: 'Cadence Virtuoso', used: ['accumulator'] },
      { name: 'Synopsys Design Compiler', used: ['noc'] },
      { name: 'Synthesis & P&R', used: ['noc'] },
      { name: 'Custom layout', used: ['accumulator'] },
      { name: 'DRC / LVS', used: ['accumulator'] },
      { name: 'ModelSim', used: ['digit'] },
      { name: 'Quartus Prime', used: ['digit'] },
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
      { name: 'LLM APIs', used: ['bias', 'role:matchingdonors'] },
      { name: 'Pandas', used: ['foodscout'] },
    ],
  },
  {
    name: 'Software & tools',
    skills: [
      { name: 'Git', used: ['role:wealthtech'] },
      { name: 'React', used: ['farewise', 'medway'] },
      { name: 'Firebase', used: ['medway'] },
      { name: 'Django', used: ['uplay'] },
      { name: 'Streamlit', used: ['asl', 'sentiment', 'foodscout', 'clearn'] },
      { name: 'Node.js', used: ['safestride'] },
      { name: 'REST APIs', used: ['farewise'] },
      { name: 'JIRA & Agile', used: ['role:wealthtech'] },
    ],
  },
]

export const ROLE_LABELS = {
  'role:mech': 'UMass Mechatronics Team',
  'role:marieb': 'Elaine Marieb Center research',
  'role:wealthtech': 'WealthTech internship',
  'role:matchingdonors': 'MatchingDonors (volunteer)',
}
