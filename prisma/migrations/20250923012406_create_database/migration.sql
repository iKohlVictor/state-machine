-- CreateEnum
CREATE TYPE "public"."rule_type" AS ENUM ('MIN_DAYS_TO_OPEN');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_active" BOOLEAN NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_type" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "pendency_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_stage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "pendency_stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "pendency_type_id" INTEGER NOT NULL,
    "pendency_stage_id" INTEGER NOT NULL,

    CONSTRAINT "pendency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_history" (
    "id" UUID NOT NULL,
    "pendency_id" UUID NOT NULL,
    "from_stage_id" INTEGER NOT NULL,
    "to_stage_id" INTEGER NOT NULL,
    "from_profile_id" INTEGER,
    "to_profile_id" INTEGER,
    "executed_by" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pendency_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_transition_rules" (
    "id" UUID NOT NULL,
    "rule_type" "public"."rule_type" NOT NULL,
    "rule_value" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "pendency_transition_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_stage_transition" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "pendency_type_id" INTEGER NOT NULL,
    "from_stage_id" INTEGER NOT NULL,
    "to_stage_id" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pendency_stage_transition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_stage_transition_profiles" (
    "id" UUID NOT NULL,
    "pendency_stage_transition_id" UUID NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "auto_close" BOOLEAN NOT NULL DEFAULT false,
    "allow_revert" BOOLEAN NOT NULL DEFAULT false,
    "allow_reassign" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pendency_stage_transition_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_stage_transition_approval_group" (
    "id" UUID NOT NULL,
    "pendency_stage_transition_id" UUID NOT NULL,
    "min_approvals_required" INTEGER NOT NULL,

    CONSTRAINT "pendency_stage_transition_approval_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pendency_stage_transition_approval_group_profiles" (
    "pendency_stage_transition_approval_group_id" UUID NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "pendency_stage_transition_approval_group_profiles_pkey" PRIMARY KEY ("pendency_stage_transition_approval_group_id","profile_id")
);

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency" ADD CONSTRAINT "pendency_pendency_type_id_fkey" FOREIGN KEY ("pendency_type_id") REFERENCES "public"."pendency_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency" ADD CONSTRAINT "pendency_pendency_stage_id_fkey" FOREIGN KEY ("pendency_stage_id") REFERENCES "public"."pendency_stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_history" ADD CONSTRAINT "pendency_history_pendency_id_fkey" FOREIGN KEY ("pendency_id") REFERENCES "public"."pendency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_history" ADD CONSTRAINT "pendency_history_executed_by_fkey" FOREIGN KEY ("executed_by") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_stage_transition" ADD CONSTRAINT "pendency_stage_transition_pendency_type_id_fkey" FOREIGN KEY ("pendency_type_id") REFERENCES "public"."pendency_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_stage_transition_profiles" ADD CONSTRAINT "pendency_stage_transition_profiles_pendency_stage_transiti_fkey" FOREIGN KEY ("pendency_stage_transition_id") REFERENCES "public"."pendency_stage_transition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_stage_transition_profiles" ADD CONSTRAINT "pendency_stage_transition_profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_stage_transition_approval_group" ADD CONSTRAINT "pendency_stage_transition_approval_group_pendency_stage_tr_fkey" FOREIGN KEY ("pendency_stage_transition_id") REFERENCES "public"."pendency_stage_transition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_stage_transition_approval_group_profiles" ADD CONSTRAINT "pendency_stage_transition_approval_group_profiles_pendency_fkey" FOREIGN KEY ("pendency_stage_transition_approval_group_id") REFERENCES "public"."pendency_stage_transition_approval_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pendency_stage_transition_approval_group_profiles" ADD CONSTRAINT "pendency_stage_transition_approval_group_profiles_profile__fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
