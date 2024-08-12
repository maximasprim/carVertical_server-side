import {
    integer,
    pgEnum,
    pgTable,
    serial,
    varchar,
    boolean,
    timestamp,
    uuid,
    text,
    decimal,
  } from "drizzle-orm/pg-core";
  import { relations } from "drizzle-orm";
  
  // Role Enum
  export const roleEnum = pgEnum("role", ["user", "admin", "buyer"]);
  
  // Users Table
  export const usersTable = pgTable("users", {
    user_id: serial("user_id").primaryKey(),
    full_name: varchar("full_name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    role: roleEnum("role").default("user"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });
  
  // Authentication Table
  export const authenticationTable = pgTable("authentication", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
    username: varchar("username", { length: 256 }).notNull(),
    role: roleEnum("role").default("user"),
    password: varchar("password", { length: 256 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  });
  
  // Vehicles Table
  export const vehiclesTable = pgTable("vehicles", {
    vehicle_id: serial("vehicle_id").primaryKey(),
    make: varchar("make", { length: 100 }).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    year: integer("year").notNull(),
    vin: varchar("vin", { length: 100 }).unique().notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  });
  
  // Vehicle Status Table
  export const vehicleStatusTable = pgTable("vehicle_status", {
    status_id: serial("status_id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    status: varchar("status", { length: 50 }).notNull(),
    date_changed: timestamp("date_changed").notNull().defaultNow(),
    description: text("description"),
  });
  
  // Transactions Table
  export const transactionsTable = pgTable("transactions", {
    transaction_id: serial("transaction_id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    buyer_id: integer("buyer_id").references(() => usersTable.user_id, { onDelete: "set null" }),
    sale_price: decimal("sale_price", { precision: 10, scale: 2 }).notNull(),
    transaction_date: timestamp("transaction_date").notNull().defaultNow(),
    status: varchar("status", { length: 50 }).notNull(),
  });
  
  // Vehicle Images Table
  export const vehicleImagesTable = pgTable("vehicle_images", {
    image_id: serial("image_id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    image_url: varchar("image_url", { length: 255 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
  });
  
  // Vehicle Details Table
  export const vehicleDetailsTable = pgTable("vehicle_details", {
    detail_id: serial("detail_id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    mileage: integer("mileage").notNull(),
    color: varchar("color", { length: 50 }),
    fuel_type: varchar("fuel_type", { length: 50 }),
    engine: varchar("engine", { length: 100 }),
    transmission: varchar("transmission", { length: 50 }),
  });
  
  // Vehicle History Table
  export const vehicleHistoryTable = pgTable("vehicle_history", {
    history_id: serial("history_id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    event: varchar("event", { length: 255 }).notNull(),
    event_date: timestamp("event_date").notNull(),
    description: text("description"),
  });
  
  // Reviews Table
  export const reviewsTable = pgTable("reviews", {
    review_id: serial("review_id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    created_at: timestamp("created_at").notNull().defaultNow(),
  });
  
  // Favorites Table
  export const favoritesTable = pgTable("favorites", {
    favorite_id: serial("favorite_id").primaryKey(),
    user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").notNull().defaultNow(),
  });
  
  // Relations
  export const userRelations = relations(usersTable, ({ many }) => ({
    reviews: many(reviewsTable),
    favorites: many(favoritesTable),
    transactions: many(transactionsTable),
    authentications: many(authenticationTable),
  }));
  
  export const vehicleRelations = relations(vehiclesTable, ({ many, one }) => ({
    images: many(vehicleImagesTable),
    details: one(vehicleDetailsTable, {
      fields: [vehiclesTable.vehicle_id],
      references: [vehicleDetailsTable.vehicle_id],
    }),
    status: many(vehicleStatusTable),
    transactions: many(transactionsTable),
    reviews: many(reviewsTable),
    favorites: many(favoritesTable),
    history: many(vehicleHistoryTable),
  }));
  
  export const authenticationRelations = relations(authenticationTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [authenticationTable.user_id],
      references: [usersTable.user_id],
    }),
  }));
  
  export const transactionsRelations = relations(transactionsTable, ({ one }) => ({
    vehicle: one(vehiclesTable, {
      fields: [transactionsTable.vehicle_id],
      references: [vehiclesTable.vehicle_id],
    }),
    buyer: one(usersTable, {
      fields: [transactionsTable.buyer_id],
      references: [usersTable.user_id],
    }),
  }));
  
  export const reviewsRelations = relations(reviewsTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [reviewsTable.user_id],
      references: [usersTable.user_id],
    }),
    vehicle: one(vehiclesTable, {
      fields: [reviewsTable.vehicle_id],
      references: [vehiclesTable.vehicle_id],
    }),
  }));
  
  export const favoritesRelations = relations(favoritesTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [favoritesTable.user_id],
      references: [usersTable.user_id],
    }),
    vehicle: one(vehiclesTable, {
      fields: [favoritesTable.vehicle_id],
      references: [vehiclesTable.vehicle_id],
    }),
  }));
  
  // Type Definitions
  export type TIUsers = typeof usersTable.$inferInsert;
  export type TSUsers = typeof usersTable.$inferSelect;
  
  export type TIVehicles = typeof vehiclesTable.$inferInsert;
  export type TSVehicles = typeof vehiclesTable.$inferSelect;
  
  export type TIAuth = typeof authenticationTable.$inferInsert;
  export type TSAuth = typeof authenticationTable.$inferSelect;
  
  export type TIVehicleStatus = typeof vehicleStatusTable.$inferInsert;
  export type TSVehicleStatus = typeof vehicleStatusTable.$inferSelect;
  
  export type TITransactions = typeof transactionsTable.$inferInsert;
  export type TSTransactions = typeof transactionsTable.$inferSelect;
  
  export type TIVehicleImages = typeof vehicleImagesTable.$inferInsert;
  export type TSVehicleImages = typeof vehicleImagesTable.$inferSelect;
  
  export type TIVehicleDetails = typeof vehicleDetailsTable.$inferInsert;
  export type TSVehicleDetails = typeof vehicleDetailsTable.$inferSelect;
  
  export type TIVehicleHistory = typeof vehicleHistoryTable.$inferInsert;
  export type TSVehicleHistory = typeof vehicleHistoryTable.$inferSelect;
  
  export type TIReviews = typeof reviewsTable.$inferInsert;
  export type TSReviews = typeof reviewsTable.$inferSelect;
  
  export type TIFavorites = typeof favoritesTable.$inferInsert;
  export type TSFavorites = typeof favoritesTable.$inferSelect;
  