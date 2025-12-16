import { User, Mail, Link2, Briefcase, Globe, MapPin } from "lucide-react";

const FormField = ({
  label,
  name,
  value,
  isEditing,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
  transform,
}) => (
  <div className="space-y-2">
    <label className="text-gray-400 text-sm font-medium flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </label>
    {isEditing ? (
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(
              name,
              transform ? transform(e.target.value) : e.target.value
            )
          }
          placeholder={placeholder}
          className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all pl-12"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {name === "username" && "@"}
        </div>
      </div>
    ) : (
      <p className="text-lg text-white px-4 py-3 bg-gray-700/30 rounded-2xl">
        {name === "website" ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            {value.replace(/^https?:\/\//, "")}
          </a>
        ) : name === "username" ? (
          `@${value}`
        ) : (
          value
        )}
      </p>
    )}
  </div>
);

export default function ProfileForm({
  user,
  editedUser,
  isEditing,
  onEditChange,
}) {
  const fields = [
    { label: "Nome completo", name: "fullName", icon: User },
    { label: "Nome de exibição", name: "displayName", icon: User },
    {
      label: "Username",
      name: "username",
      transform: (val) => val.replace(/[^a-z0-9_]/gi, "").toLowerCase(),
      icon: User,
    },
    { label: "Profissão", name: "profession", icon: Briefcase },
    {
      label: "Website",
      name: "website",
      type: "url",
      placeholder: "https://",
      icon: Link2,
    },
    { label: "Localização", name: "location", icon: MapPin },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            value={isEditing ? editedUser[field.name] : user[field.name]}
            isEditing={isEditing}
            onChange={onEditChange}
            type={field.type}
            placeholder={field.placeholder}
            icon={field.icon}
            transform={field.transform}
          />
        ))}
      </div>

      {/* Campo de Bio */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Bio
        </label>
        {isEditing ? (
          <textarea
            rows={4}
            value={editedUser.bio}
            onChange={(e) => onEditChange("bio", e.target.value)}
            className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all resize-none"
            placeholder="Conte um pouco sobre você..."
          />
        ) : (
          <p className="text-white leading-relaxed text-lg px-4 py-3 bg-gray-700/30 rounded-2xl">
            {user.bio}
          </p>
        )}
      </div>
    </div>
  );
}
