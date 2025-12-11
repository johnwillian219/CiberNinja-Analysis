// Dentro do Sidebar.jsx, adicione o state e o modal no final do return

const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

const handleLogout = () => {
  // Aqui você limpa o auth (ex: localStorage.clear(), context.logout(), etc)
  localStorage.removeItem("token"); // exemplo
  // ou useAuth().logout();

  setIsLogoutModalOpen(false);
  // Redireciona para login
  navigate("/login"); // certifique-se de importar useNavigate
};

return (
  <>
    <aside>...</aside>

    {/* Modal de Logout */}
    <ConfirmationModal
      isOpen={isLogoutModalOpen}
      onClose={() => setIsLogoutModalOpen(false)}
      onConfirm={handleLogout}
      title="Terminar sessão?"
      message="Tem certeza que deseja sair da sua conta?"
      confirmText="Sim, sair"
      type="danger"
    />
  </>
);
