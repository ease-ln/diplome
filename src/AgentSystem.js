export function getAgentSystem(){
    try {
      let os = navigator.userAgent;
      if (os.search('Windows')!==-1){
          return 'https://innometric.guru/files/collectors-files/mac_collector/InnoMetricsCollectorV317.zip';
      }
      if (os.search('Mac')!==-1){
          return 'https://innometric.guru/files/collectors-files/mac_collector/InnoMetricsCollectorV317.zip';
      }
      if (os.search('X11')!==-1 && (os.search('Linux')===-1)){
          return 'https://innometric.guru/files/collectors-files/linux_collector/dataCollector_1.0.2.zip';
      }
      if (os.search('Linux')!==-1 && os.search('X11')!==-1){
          return 'https://innometric.guru/files/collectors-files/linux_collector/dataCollector_1.0.2.zip';
      }
    } catch (error) {
      console.log(error);
    }
  }