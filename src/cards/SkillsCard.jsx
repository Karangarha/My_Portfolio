const SkillsCard = ({ title, value }) => {
  return (
    <div className="bg-background p-4 flex flex-rows gap-2">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <div key={item.name}>
            {typeof item.icon === "string" ? (
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
            ) : (
              <item.icon
                size={36}
                className="bg-primary/10 text-primary rounded-full p-2"
              />
            )}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
