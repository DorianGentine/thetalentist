# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_04_30_111203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "credentials", force: :cascade do |t|
    t.string "firstname"
    t.string "company_name"
    t.string "name"
    t.string "phone"
    t.string "email"
    t.bigint "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talent_id"], name: "index_credentials_on_talent_id"
  end

  create_table "experiences", force: :cascade do |t|
    t.string "position"
    t.string "company_name"
    t.string "link"
    t.string "overview"
    t.string "years"
    t.boolean "currently"
    t.bigint "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talent_id"], name: "index_experiences_on_talent_id"
  end

  create_table "formations", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keywords", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "knowns", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "languages", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "next_aventures", force: :cascade do |t|
    t.string "city"
    t.string "contrat"
    t.string "remuneration"
    t.text "overview"
    t.text "no_more"
    t.text "why_leaving"
    t.text "last_words"
    t.boolean "available"
    t.bigint "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talent_id"], name: "index_next_aventures_on_talent_id"
  end

  create_table "sectors", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "talent_formations", force: :cascade do |t|
    t.integer "year"
    t.bigint "talent_id"
    t.bigint "formation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.index ["formation_id"], name: "index_talent_formations_on_formation_id"
    t.index ["talent_id"], name: "index_talent_formations_on_talent_id"
  end

  create_table "talent_keywords", force: :cascade do |t|
    t.bigint "talent_id"
    t.bigint "keyword_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["keyword_id"], name: "index_talent_keywords_on_keyword_id"
    t.index ["talent_id"], name: "index_talent_keywords_on_talent_id"
  end

  create_table "talent_knowns", force: :cascade do |t|
    t.bigint "known_id"
    t.bigint "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["known_id"], name: "index_talent_knowns_on_known_id"
    t.index ["talent_id"], name: "index_talent_knowns_on_talent_id"
  end

  create_table "talent_languages", force: :cascade do |t|
    t.bigint "language_id"
    t.bigint "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "level"
    t.index ["language_id"], name: "index_talent_languages_on_language_id"
    t.index ["talent_id"], name: "index_talent_languages_on_talent_id"
  end

  create_table "talent_sectors", force: :cascade do |t|
    t.bigint "talent_id"
    t.bigint "sector_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sector_id"], name: "index_talent_sectors_on_sector_id"
    t.index ["talent_id"], name: "index_talent_sectors_on_talent_id"
  end

  create_table "talent_skills", force: :cascade do |t|
    t.integer "level"
    t.bigint "talent_id"
    t.bigint "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skill_id"], name: "index_talent_skills_on_skill_id"
    t.index ["talent_id"], name: "index_talent_skills_on_talent_id"
  end

  create_table "talent_technos", force: :cascade do |t|
    t.bigint "techno_id"
    t.bigint "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talent_id"], name: "index_talent_technos_on_talent_id"
    t.index ["techno_id"], name: "index_talent_technos_on_techno_id"
  end

  create_table "talents", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "firstname"
    t.string "name"
    t.string "city"
    t.text "overview"
    t.string "phone"
    t.string "linkedin"
    t.string "cv"
    t.boolean "btob"
    t.boolean "btoc"
    t.boolean "validated"
    t.boolean "visible"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_talents_on_email", unique: true
    t.index ["reset_password_token"], name: "index_talents_on_reset_password_token", unique: true
  end

  create_table "technos", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "credentials", "talents"
  add_foreign_key "experiences", "talents"
  add_foreign_key "next_aventures", "talents"
  add_foreign_key "talent_formations", "formations"
  add_foreign_key "talent_formations", "talents"
  add_foreign_key "talent_keywords", "keywords"
  add_foreign_key "talent_keywords", "talents"
  add_foreign_key "talent_knowns", "knowns"
  add_foreign_key "talent_knowns", "talents"
  add_foreign_key "talent_languages", "languages"
  add_foreign_key "talent_languages", "talents"
  add_foreign_key "talent_sectors", "sectors"
  add_foreign_key "talent_sectors", "talents"
  add_foreign_key "talent_skills", "skills"
  add_foreign_key "talent_skills", "talents"
  add_foreign_key "talent_technos", "talents"
  add_foreign_key "talent_technos", "technos"
end