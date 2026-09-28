import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { properties, searchFilters } from '../../core/data/property-data';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activePanel: 'home' | 'rent' | 'contact' | 'list' = 'home';
  activeModal: 'contact' | 'list' | null = null;
  isMobileMenuOpen = false;
  isFilterOpen = false;
  isRegionDropdownOpen = false;
  minPrice = 0;
  maxPrice = 5000;
  minBeds = 0;
  maxBeds = 20;
  bedroomsAny = true;
  selectedRegion = 'All regions';

  readonly navItems = [
    { label: 'Home', action: 'home' },
    { label: 'Rent', action: 'rent' },
    { label: 'Contact', action: 'contact' },
    { label: 'List', action: 'list' },
  ];
  readonly mobileNavItems = this.navItems.filter((item) => item.action !== 'rent');

  readonly searchFilters = searchFilters;
  readonly properties = properties;
  readonly ghanaRegions = [
    'All regions',
    'Ahafo',
    'Ashanti',
    'Bono',
    'Bono East',
    'Central',
    'Eastern',
    'Greater Accra',
    'North East',
    'Northern',
    'Oti',
    'Savannah',
    'Upper East',
    'Upper West',
    'Volta',
    'Western',
    'Western North',
  ];

  constructor(private readonly router: Router) {}

  handleNav(action: string): void {
    this.isMobileMenuOpen = false;

    if (action === 'rent') {
      this.activePanel = 'rent';
      this.activeModal = null;
      document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (action === 'contact' || action === 'list') {
      this.activePanel = action;
      this.activeModal = action;
      return;
    }

    this.activePanel = 'home';
    this.activeModal = null;
    this.scrollHomeIntoView();
  }

  closeModal(): void {
    this.activeModal = null;
    this.activePanel = 'home';
  }

  openFilters(): void {
    this.isFilterOpen = true;
  }

  closeFilters(): void {
    this.isFilterOpen = false;
    this.isRegionDropdownOpen = false;
  }

  resetFilters(): void {
    this.minPrice = 0;
    this.maxPrice = 5000;
    this.minBeds = 0;
    this.maxBeds = 20;
    this.bedroomsAny = true;
    this.selectedRegion = 'All regions';
    this.isRegionDropdownOpen = false;
  }

  toggleRegionDropdown(): void {
    this.isRegionDropdownOpen = !this.isRegionDropdownOpen;
  }

  selectRegion(region: string): void {
    this.selectedRegion = region;
    this.isRegionDropdownOpen = false;
  }

  setBedroomsAny(): void {
    this.bedroomsAny = true;
    this.minBeds = 0;
    this.maxBeds = 20;
  }

  setBedroomRange(): void {
    this.bedroomsAny = false;
  }

  get filteredProperties() {
    const lowestPrice = Math.min(this.minPrice, this.maxPrice);
    const highestPrice = Math.max(this.minPrice, this.maxPrice);
    const lowestBeds = Math.min(Math.max(this.minBeds, 0), Math.max(this.maxBeds, 0), 20);
    const highestBeds = Math.max(Math.min(this.minBeds, 20), Math.min(this.maxBeds, 20));

    return this.properties.filter((property) => {
      const matchesPrice = property.price >= lowestPrice && property.price <= highestPrice;
      const matchesBeds = this.bedroomsAny || (property.beds >= lowestBeds && property.beds <= highestBeds);
      const matchesRegion = this.selectedRegion === 'All regions' || property.region === this.selectedRegion;

      return matchesPrice && matchesBeds && matchesRegion;
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isNavActive(action: string): boolean {
    return this.activePanel === action;
  }

  openProperty(slug: string): void {
    void this.router.navigate(['/properties', slug]);
  }

  formatPrice(price: number): string {
    return `GH₵${price.toLocaleString()}`;
  }

  private scrollHomeIntoView(): void {
    const target = window.matchMedia('(min-width: 768px)').matches ? 'desktop-home' : 'home';
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
