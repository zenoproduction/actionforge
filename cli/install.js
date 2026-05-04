#!/usr/bin/env node

/**
 * ActionForge Claude Code Skill Installer
 * Copies the ActionForge skill into the user's local Claude skills directory.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'actionforge';
const PACKAGE_NAME = '@actionforge/claude-skill';

function log(message) {
  process.stdout.write(message + '\n');
}

function error(message) {
  process.stderr.write('[ERROR] ' + message + '\n');
}

function getTargetDir() {
  const homeDir = os.homedir();
  return path.join(homeDir, '.claude', 'skills', SKILL_NAME);
}

function getSourceDir() {
  // When installed via npm, source is relative to this file
  const npmSource = path.join(__dirname, '..', '.claude', 'skills', SKILL_NAME);
  if (fs.existsSync(npmSource)) {
    return npmSource;
  }

  // When run from the cloned repo root
  const repoSource = path.join(__dirname, '..', '.claude', 'skills', SKILL_NAME);
  if (fs.existsSync(repoSource)) {
    return repoSource;
  }

  return null;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    ensureDir(dest);
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function countFiles(dirPath) {
  let count = 0;
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const full = path.join(dirPath, entry);
    if (fs.statSync(full).isDirectory()) {
      count += countFiles(full);
    } else {
      count += 1;
    }
  }
  return count;
}

function install() {
  log('');
  log('ActionForge — Claude Code Skill Installer');
  log('==========================================');
  log('');

  const sourceDir = getSourceDir();
  if (!sourceDir) {
    error('Could not locate ActionForge skill source files.');
    error('Ensure you installed the package correctly: npm install -g ' + PACKAGE_NAME);
    process.exit(1);
  }

  const targetDir = getTargetDir();

  log('Source : ' + sourceDir);
  log('Target : ' + targetDir);
  log('');

  if (fs.existsSync(targetDir)) {
    log('Existing installation found. Updating...');
  } else {
    log('No existing installation found. Installing fresh...');
  }

  try {
    ensureDir(path.dirname(targetDir));
    copyRecursive(sourceDir, targetDir);

    const fileCount = countFiles(targetDir);
    log('');
    log('Done. ' + fileCount + ' file(s) installed to:');
    log('  ' + targetDir);
    log('');
    log('Usage in Claude Code:');
    log('  /actionforge <your idea, task, or bug>');
    log('  /af <your input>');
    log('  /forge <your input>');
    log('');
    log('With a mode:');
    log('  /actionforge /mode dev implement OAuth2 login');
    log('  /actionforge /mode jira the checkout flow breaks on mobile');
    log('  /actionforge /mode startup I want to build a SaaS for X');
    log('  /actionforge /mode debug users are getting 500 errors on login');
    log('');
    log('For more information, visit:');
    log('  https://github.com/zenoproduction/actionforge');
    log('');
  } catch (err) {
    error('Installation failed: ' + err.message);
    process.exit(1);
  }
}

function uninstall() {
  const targetDir = getTargetDir();

  log('');
  log('ActionForge — Uninstall');
  log('=======================');
  log('');

  if (!fs.existsSync(targetDir)) {
    log('ActionForge is not installed at:');
    log('  ' + targetDir);
    log('Nothing to remove.');
    return;
  }

  try {
    fs.rmSync(targetDir, { recursive: true, force: true });
    log('Removed: ' + targetDir);
    log('ActionForge has been uninstalled.');
    log('');
  } catch (err) {
    error('Uninstall failed: ' + err.message);
    process.exit(1);
  }
}

function printHelp() {
  log('');
  log('actionforge-install — ActionForge Claude Code Skill Installer');
  log('');
  log('Usage:');
  log('  actionforge-install           Install ActionForge skill');
  log('  actionforge-install install   Install ActionForge skill');
  log('  actionforge-install uninstall Remove ActionForge skill');
  log('  actionforge-install help      Show this help message');
  log('');
  log('Installs to: ' + getTargetDir());
  log('');
}

const args = process.argv.slice(2);
const command = args[0] || 'install';

switch (command) {
  case 'install':
    install();
    break;
  case 'uninstall':
    uninstall();
    break;
  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;
  default:
    error('Unknown command: ' + command);
    printHelp();
    process.exit(1);
}
