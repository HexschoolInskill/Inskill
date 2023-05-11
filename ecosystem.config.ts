export default {
  apps: [
    {
      name: 'InSkill',
      script: './.output/server/index.mjs',
      // instances: 'max', //負載平衡模式下的 cpu 數量
      // exec_mode : "cluster", // cpu 負載平衡模式
      max_memory_restart: '10G', // 緩存了多少記憶體重新整理
      port: 3000, // 指定伺服器上的 port
      time: true
    }
  ]
}
