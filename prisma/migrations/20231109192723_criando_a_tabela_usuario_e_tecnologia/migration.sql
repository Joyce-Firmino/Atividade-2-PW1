-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usernome" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tecnologia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "marcarEstudado" BOOLEAN NOT NULL,
    "dtPrazoFinal" TIMESTAMP(3) NOT NULL,
    "dtCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Tecnologia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usernome_key" ON "Usuario"("usernome");

-- AddForeignKey
ALTER TABLE "Tecnologia" ADD CONSTRAINT "Tecnologia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
