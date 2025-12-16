export default function ProfileStats({ stats }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
      <h3 className="text-xl font-bold text-white mb-6">Estatísticas</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${stat.color.replace(
                    "text",
                    "bg"
                  )}/20`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
