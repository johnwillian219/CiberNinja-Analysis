export default function ProfileHeader({ title, subtitle, gradient }) {
  return (
    <div className="text-center mb-12">
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4 animate-gradient`}
      >
        {title}
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
